const adminProducts = document.querySelector("#adminProducts");
const adminOutput = document.querySelector("#adminOutput");
const downloadConfig = document.querySelector("#downloadConfig");
const copyConfig = document.querySelector("#copyConfig");
const downloadReport = document.querySelector("#downloadReport");
const adminMetrics = document.querySelector("#adminMetrics");
const adminLastOrder = document.querySelector("#adminLastOrder");

let config = { products: [] };

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function normalizeList(value) {
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderOutput() {
  adminOutput.value = JSON.stringify(config, null, 2);
}

function renderMetrics() {
  const analytics = readJson("jul:analytics", {});
  const lastOrder = readJson("jul:last-order", null);
  const metricItems = [
    ["الزيارات", analytics.visits || 0],
    ["مشاهدات المنتجات", Object.values(analytics.productViews || {}).reduce((sum, value) => sum + value, 0)],
    ["إضافات للسلة", Object.values(analytics.cartAdds || {}).reduce((sum, value) => sum + value, 0)],
    ["محاولات إرسال الطلب", analytics.orderSubmits || analytics.checkoutStarts || 0],
  ];

  adminMetrics.innerHTML = metricItems
    .map(([label, value]) => `<div class="admin-metric"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  if (!lastOrder) {
    adminLastOrder.innerHTML = "<span>ماكو طلب محفوظ على هذا الجهاز حالياً.</span>";
    return;
  }

  const items = (lastOrder.items || [])
    .map((item) => `${item.name || item.id} (${item.size}/${item.color}) × ${item.quantity}`)
    .join("، ");

  adminLastOrder.innerHTML = `
    <strong>${lastOrder.id}</strong>
    <span>${lastOrder.customer || ""} - ${lastOrder.mobile || ""}</span>
    <span>${items}</span>
    <span>الإجمالي: ${Number(lastOrder.total || 0).toFixed(3)} د.ك</span>
  `;
}

function updateProduct(id, patch) {
  config.products = config.products.map((product) =>
    product.id === id ? { ...product, ...patch } : product
  );
  renderOutput();
}

function renderAdmin() {
  adminProducts.innerHTML = "";

  config.products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "admin-card";
    card.innerHTML = `
      <form class="admin-form">
        <label>
          المنتج
          <input name="name" value="${product.name || product.id}" />
        </label>
        <label>
          السعر
          <input name="price" type="number" step="0.001" min="0" value="${product.price}" />
        </label>
        <label>
          ظاهر؟
          <select name="active" class="size-select">
            <option value="true"${product.active !== false ? " selected" : ""}>نعم</option>
            <option value="false"${product.active === false ? " selected" : ""}>لا</option>
          </select>
        </label>
        <label>
          مخزون افتراضي
          <input name="stockDefault" type="number" min="0" step="1" value="${product.stock?.default ?? 5}" />
        </label>
        <label>
          قليل المخزون
          <textarea name="low">${(product.stock?.low || []).join("\n")}</textarea>
        </label>
        <label>
          غير متوفر
          <textarea name="soldOut">${(product.stock?.soldOut || []).join("\n")}</textarea>
        </label>
        <label style="grid-column: 1 / -1">
          تفاصيل المنتج
          <textarea name="details">${(product.details || []).join("\n")}</textarea>
        </label>
      </form>
    `;

    const form = card.querySelector("form");
    form.addEventListener("input", () => {
      const formData = new FormData(form);
      updateProduct(product.id, {
        name: formData.get("name"),
        price: Number.parseFloat(formData.get("price")) || 0,
        active: formData.get("active") === "true",
        details: normalizeList(formData.get("details")),
        stock: {
          default: Number.parseInt(formData.get("stockDefault"), 10) || 0,
          low: normalizeList(formData.get("low")),
          soldOut: normalizeList(formData.get("soldOut")),
        },
      });
    });
    form.addEventListener("change", () => form.dispatchEvent(new Event("input")));
    adminProducts.append(card);
  });

  renderOutput();
}

async function loadConfig() {
  const response = await fetch(`products.json?v=${Date.now()}`, { cache: "no-store" });
  config = await response.json();
  renderAdmin();
}

downloadConfig.addEventListener("click", () => {
  const blob = new Blob([adminOutput.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "products.json";
  link.click();
  URL.revokeObjectURL(url);
});

copyConfig.addEventListener("click", async () => {
  await navigator.clipboard.writeText(adminOutput.value);
  copyConfig.textContent = "تم النسخ";
  setTimeout(() => {
    copyConfig.textContent = "نسخ JSON";
  }, 1200);
});

downloadReport.addEventListener("click", () => {
  const report = {
    generatedAt: new Date().toISOString(),
    analytics: readJson("jul:analytics", {}),
    lastOrder: readJson("jul:last-order", null),
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `jul-store-report-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

loadConfig().catch(() => {
  adminProducts.innerHTML = '<p class="empty-cart">تعذر تحميل products.json.</p>';
});

renderMetrics();
