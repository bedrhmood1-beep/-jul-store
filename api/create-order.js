import fs from "node:fs";
import path from "node:path";

const baseCatalog = {
  "tshirt-black": { name: "JUL T-Shirt Black", price: 5.25 },
  "tshirt-white": { name: "JUL T-Shirt White", price: 5.25 },
  "tshirt-taupe": { name: "JUL T-Shirt Taupe", price: 5.25 },
  "tshirt-navy": { name: "JUL T-Shirt Navy", price: 5.25 },
  "shorts-black": { name: "JUL Shorts Black", price: 6.5 },
  "shorts-light-blue": { name: "JUL Shorts Light Blue", price: 6.5 },
  "shorts-taupe": { name: "JUL Shorts Taupe", price: 6.5 },
  "shorts-off-white": { name: "JUL Shorts Off White", price: 6.5 },
  "hoodie-beige": { name: "JUL Hoodie Beige", price: 13.9 },
  "hoodie-black-back": { name: "JUL Hoodie Black Back", price: 13.9 },
  "half-zip-charcoal": { name: "JUL Half Zip Charcoal", price: 12.9 },
  "tank-top-white": { name: "JUL Tank Top White", price: 4.25 },
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
        stock: item.stock || catalog[item.id].stock,
      };
    });
  } catch {
    return catalog;
  }

  return catalog;
}

function deliveryFee() {
  const value = Number.parseFloat(process.env.DELIVERY_FEE_KWD || "1.5");
  return Number.isFinite(value) && value >= 0 ? Number(value.toFixed(3)) : 1.5;
}

function stockKey(size, colorName) {
  return `${size}::${colorName}`;
}

function availableStock(product, size, colorName) {
  const rule = product.stock;
  if (!rule) return Number.POSITIVE_INFINITY;

  const key = stockKey(size, colorName);
  if (Array.isArray(rule.soldOut) && rule.soldOut.includes(key)) return 0;
  if (Array.isArray(rule.low) && rule.low.includes(key)) return 1;

  const value = Number.parseInt(rule.default, 10);
  return Number.isFinite(value) && value >= 0 ? value : Number.POSITIVE_INFINITY;
}

function buildOrderSummary(order) {
  const catalog = catalogFromConfig();
  const items = Array.isArray(order.items) ? order.items : [];
  let subtotal = 0;

  const normalizedItems = items.map((item) => {
    const product = catalog[item.id];
    const quantity = Number.parseInt(item.quantity, 10);
    const size = String(item.size || "").trim();
    const color = String(item.color || "").trim();

    if (!product || !Number.isFinite(quantity) || quantity < 1) {
      throw new Error("Invalid cart item.");
    }
    if (!size || !color) {
      throw new Error("Size and color are required.");
    }
    if (quantity > availableStock(product, size, color)) {
      throw new Error("Selected size and color are out of stock.");
    }

    const lineTotal = Number((product.price * quantity).toFixed(3));
    subtotal += lineTotal;
    return {
      id: item.id,
      name: product.name,
      size,
      color,
      quantity,
      price: Number(product.price.toFixed(3)),
      lineTotal,
    };
  });

  if (!normalizedItems.length || subtotal <= 0) {
    throw new Error("Cart is empty.");
  }

  const delivery = deliveryFee();
  return {
    items: normalizedItems,
    subtotal: Number(subtotal.toFixed(3)),
    delivery,
    total: Number((subtotal + delivery).toFixed(3)),
  };
}

async function notifyOrderWebhook(order) {
  const webhookUrl = process.env.ORDER_WEBHOOK_URL;
  if (!webhookUrl) return false;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...order,
      source: "jul-store",
    }),
  });

  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  try {
    const incoming = req.body || {};
    const summary = buildOrderSummary(incoming);
    const order = {
      ...incoming,
      id: String(incoming.id || `JUL-${Date.now().toString().slice(-6)}`),
      date: incoming.date || new Date().toISOString(),
      ...summary,
      status: "received",
    };

    const webhookDelivered = await notifyOrderWebhook(order).catch(() => false);

    res.status(200).json({
      ok: true,
      orderId: order.id,
      total: order.total,
      webhookDelivered,
      message: "Order received.",
    });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message || "Invalid order request." });
  }
}
