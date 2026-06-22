const catalog = {
  "minimal-jul-tee": { name: "Minimal JUL Tee", price: 4.9 },
  "sand-linen-blazer": { name: "Sand Linen Blazer", price: 24.5 },
  "oxford-shirt": { name: "Oxford Shirt", price: 9.75 },
  "tailored-trouser": { name: "Tailored Trouser", price: 12.25 },
  "soft-knit-sweater": { name: "Soft Knit Sweater", price: 14.9 },
  "cotton-shorts": { name: "Cotton Shorts", price: 7.5 },
};

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

function buildInvoice(order) {
  const items = Array.isArray(order.items) ? order.items : [];
  let invoiceValue = 0;
  const invoiceItems = items.map((item) => {
    const product = catalog[item.id];
    const quantity = Number.parseInt(item.quantity, 10);

    if (!product || !Number.isFinite(quantity) || quantity < 1) {
      throw new Error("Invalid cart item.");
    }

    invoiceValue += product.price * quantity;
    return {
      ItemName: product.name,
      Quantity: quantity,
      UnitPrice: Number(product.price.toFixed(3)),
    };
  });

  if (!invoiceItems.length || invoiceValue <= 0) {
    throw new Error("Cart is empty.");
  }

  return { invoiceValue: Number(invoiceValue.toFixed(3)), invoiceItems };
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
    const { invoiceValue, invoiceItems } = buildInvoice(order);
    const siteUrl = getBaseUrl(req);
    const address = order.address || {};

    const payload = {
      PaymentMethodId: paymentMethodId(order.payment),
      CustomerName: String(order.customer || "JUL Customer"),
      DisplayCurrencyIso: "KWD",
      MobileCountryCode: "965",
      CustomerMobile: cleanMobile(order.mobile),
      InvoiceValue: invoiceValue,
      Language: "AR",
      CustomerReference: String(order.id || Date.now()),
      CustomerAddress: {
        Block: String(address.block || ""),
        Street: String(address.street || ""),
        HouseBuildingNo: String(address.house || ""),
        Address: String(address.area || ""),
        AddressInstructions: [address.floor, order.notes].filter(Boolean).join(" - "),
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

    res.status(200).json({
      ok: true,
      orderId: payload.CustomerReference,
      invoiceId: data.Data.InvoiceId,
      total: invoiceValue,
      paymentUrl: data.Data.PaymentURL,
    });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message || "Invalid payment request." });
  }
}
