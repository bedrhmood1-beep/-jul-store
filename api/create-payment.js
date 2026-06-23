import fs from "node:fs";
import path from "node:path";

const baseCatalog = {
  "minimal-jul-tee": { name: "Minimal JUL Tee", price: 4.9 },
  "sand-linen-blazer": { name: "Sand Linen Blazer", price: 24.5 },
  "oxford-shirt": { name: "Oxford Shirt", price: 9.75 },
  "tailored-trouser": { name: "Tailored Trouser", price: 12.25 },
  "soft-knit-sweater": { name: "Soft Knit Sweater", price: 14.9 },
  "cotton-shorts": { name: "Cotton Shorts", price: 7.5 },
};

function catalogFromConfig() {
  const catalog = { ...baseCatalog };

  try {
    const configPath = path.join(process.cwd(), "products.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    if (!Array.isArray(config.products)) return catalog;

    config.products.forEach((item) => {
      if (!item?.id || !catalog[item.id]) return;
      if (item.active === false) {
        delete catalog[item.id];
        return;
      }
      const price = Number.parseFloat(item.price);
      catalog[item.id] = {
        ...catalog[item.id],
        name: item.name || catalog[item.id].name,
        price: Number.isFinite(price) && price > 0 ? price : catalog[item.id].price,
      };
    });
  } catch {
    return catalog;
  }

  return catalog;
}

function paymentMethodId(payment) {
  if (/visa|master/i.test(payment || "")) return 2;
  if (/apple/i.test(payment || "")) return 11;
  return 1;
}

function cleanMobile(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.startsWith("965") && digits.length > 8 ? digits.slice(-8) : digits;
}

function getBaseUrl(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return host ? `${proto}://${host}` : "";
}

function deliveryFee() {
  const value = Number.parseFloat(process.env.DELIVERY_FEE_KWD || "1.5");
  return Number.isFinite(value) && value >= 0 ? Number(value.toFixed(3)) : 1.5;
}

function buildInvoice(order) {
  const catalog = catalogFromConfig();
  const items = Array.isArray(order.items) ? order.items : [];
  let invoiceValue = 0;
  const invoiceItems = items.map((item) => {
    const product = catalog[item.id];
    const quantity = Number.parseInt(item.quantity, 10);

    if (!product || !Number.isFinite(quantity) || quantity < 1) {
      throw new Error("Invalid cart item.");
    }

    const size = String(item.size || "").trim();
    const color = String(item.color || "").trim();
    if (!size || !color) {
      throw new Error("Size and color are required.");
    }

    invoiceValue += product.price * quantity;
    return {
      ItemName: `${product.name} - Size ${size} - ${color}`,
      Quantity: quantity,
      UnitPrice: Number(product.price.toFixed(3)),
    };
  });

  if (!invoiceItems.length || invoiceValue <= 0) {
    throw new Error("Cart is empty.");
  }

  const delivery = deliveryFee();
  if (delivery > 0) {
    invoiceValue += delivery;
    invoiceItems.push({
      ItemName: "Kuwait Delivery",
      Quantity: 1,
      UnitPrice: delivery,
    });
  }

  return {
    delivery,
    invoiceValue: Number(invoiceValue.toFixed(3)),
    invoiceItems,
  };
}

async function notifyOrderWebhook(order, payment) {
  const webhookUrl = process.env.ORDER_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...order,
        paymentMethod: order.payment,
        myfatoorah: payment,
        source: "jul-store",
      }),
    });
  } catch {
    // Payment should not fail only because the optional order webhook is down.
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  const token = process.env.MYFATOORAH_TOKEN;
  const baseUrl = process.env.MYFATOORAH_BASE_URL || "https://apitest.myfatoorah.com";

  if (!token) {
    res.status(500).json({ ok: false, message: "MYFATOORAH_TOKEN is missing." });
    return;
  }

  try {
    const order = req.body || {};
    const { delivery, invoiceValue, invoiceItems } = buildInvoice(order);
    const siteUrl = getBaseUrl(req);
    const address = order.address || {};
    const itemSummary = invoiceItems
      .filter((item) => item.ItemName !== "Kuwait Delivery")
      .map((item) => `${item.ItemName} x${item.Quantity}`)
      .join(" | ");

    const payload = {
      PaymentMethodId: paymentMethodId(order.payment),
      CustomerName: String(order.customer || "JUL Customer"),
      DisplayCurrencyIso: "KWD",
      MobileCountryCode: "965",
      CustomerMobile: cleanMobile(order.mobile),
      InvoiceValue: invoiceValue,
      Language: "AR",
      CustomerReference: String(order.id || Date.now()),
      UserDefinedField: itemSummary.slice(0, 500),
      CustomerAddress: {
        Block: String(address.block || ""),
        Street: String(address.street || ""),
        HouseBuildingNo: String(address.house || ""),
        Address: String(address.area || ""),
        AddressInstructions: [address.floor, order.notes, `Delivery ${delivery.toFixed(3)} KWD`]
          .filter(Boolean)
          .join(" - "),
      },
      InvoiceItems: invoiceItems,
    };

    if (siteUrl) {
      payload.CallBackUrl = `${siteUrl}/?payment=success&order=${encodeURIComponent(payload.CustomerReference)}`;
      payload.ErrorUrl = `${siteUrl}/?payment=failed&order=${encodeURIComponent(payload.CustomerReference)}`;
    }

    const mfResponse = await fetch(`${baseUrl.replace(/\/$/, "")}/v2/ExecutePayment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await mfResponse.json().catch(() => ({}));

    if (!mfResponse.ok || !data.IsSuccess || !data.Data?.PaymentURL) {
      res.status(502).json({
        ok: false,
        message: data.Message || "MyFatoorah rejected the payment request.",
      });
      return;
    }

    const payment = {
      orderId: payload.CustomerReference,
      invoiceId: data.Data.InvoiceId,
      total: invoiceValue,
      delivery,
      paymentUrl: data.Data.PaymentURL,
    };

    await notifyOrderWebhook(order, payment);

    res.status(200).json({
      ok: true,
      ...payment,
    });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message || "Invalid payment request." });
  }
}
