const merchantEmail = "bedrhmood1@gmail.com";
const paymentEndpoint = "/api/create-payment";
const deliveryFee = 1.5;

const products = [
  {
    id: "minimal-jul-tee",
    name: "Minimal JUL Tee",
    category: "T-Shirts",
    badge: "Selected",
    icon: "TEE",
    image: "assets/minimal-jul-tee.png",
    price: 4.9,
    description: "تيشيرت أسود بتصميم JUL ذهبي بسيط وراقي.",
    tones: ["#111111", "#b88a3e"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Navy", hex: "#0d2338" },
      { name: "Off White", hex: "#f8f3e8" },
    ],
  },
  {
    id: "sand-linen-blazer",
    name: "Sand Linen Blazer",
    category: "Blazers",
    badge: "Premium",
    icon: "BLAZER",
    image: "",
    price: 24.5,
    description: "بليزر لينن بلون رملي بقصة نظيفة للمناسبات والكاجوال الذكي.",
    tones: ["#d2b47f", "#0d2338"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sand", hex: "#d2b47f" },
      { name: "Off White", hex: "#f4ead7" },
      { name: "Navy", hex: "#0d2338" },
    ],
  },
  {
    id: "oxford-shirt",
    name: "Oxford Shirt",
    category: "Shirts",
    badge: "Daily",
    icon: "SHIRT",
    image: "",
    price: 9.75,
    description: "قميص أوكسفورد عملي بألوان هادئة وملمس مريح لليوم الكامل.",
    tones: ["#f8f3e8", "#173653"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Blue", hex: "#c7d2df" },
      { name: "Navy", hex: "#173653" },
    ],
  },
  {
    id: "tailored-trouser",
    name: "Tailored Trouser",
    category: "Trousers",
    badge: "Best Fit",
    icon: "PANTS",
    image: "",
    price: 12.25,
    description: "بنطلون تفصيل بخطوط مرتبة يناسب القمصان والتيشيرتات.",
    tones: ["#0d2338", "#b88a3e"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#0d2338" },
      { name: "Black", hex: "#222222" },
      { name: "Stone", hex: "#d6d0c2" },
    ],
  },
  {
    id: "soft-knit-sweater",
    name: "Soft Knit Sweater",
    category: "Sweaters",
    badge: "Soft",
    icon: "KNIT",
    image: "",
    price: 14.9,
    description: "سويتر ناعم وخفيف بتصميم بسيط مناسب للأجواء الباردة.",
    tones: ["#ece3d2", "#9b7a3c"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#ece3d2" },
      { name: "Camel", hex: "#9b7a3c" },
      { name: "Navy", hex: "#071927" },
    ],
  },
  {
    id: "cotton-shorts",
    name: "Cotton Shorts",
    category: "Shorts",
    badge: "Casual",
    icon: "SHORTS",
    image: "",
    price: 7.5,
    description: "شورت قطن مريح بقصة مرتبة للمشاوير اليومية.",
    tones: ["#173653", "#f1d58b"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#173653" },
      { name: "Sand", hex: "#d2b47f" },
      { name: "Off White", hex: "#f8f3e8" },
    ],
  },
];

const cart = new Map();
let activeCategory = "All";
let searchTerm = "";

const productsGrid = document.querySelector("#productsGrid");
const categoryFilters = document.querySelector("#categoryFilters");
const productTemplate = document.querySelector("#productTemplate");
const cartPanel = document.querySelector("#cartPanel");
const scrim = document.querySelector("#scrim");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartSubtotal = document.querySelector("#cartSubtotal");
const cartDelivery = document.querySelector("#cartDelivery");
const cartTotal = document.querySelector("#cartTotal");
const searchInput = document.querySelector("#searchInput");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutResult = document.querySelector("#checkoutResult");
const checkoutButton = checkoutForm.querySelector('button[type="submit"]');
const paymentStatus = document.querySelector("#paymentStatus");

function formatPrice(value) {
  return `${Number(value).toFixed(3)} د.ك`;
}

function variantKey(id, size, colorName) {
  return `${id}::${size}::${colorName}`;
}

function filteredProducts() {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  return products.filter((product) => {
    const byCategory = activeCategory === "All" || product.category === activeCategory;
    const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return byCategory && text.includes(normalizedSearch);
  });
}

function renderPaymentStatus() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("payment");
  const order = params.get("order");

  if (!status || !paymentStatus) return;

  paymentStatus.hidden = false;
  paymentStatus.className = `payment-status ${status === "success" ? "success" : "failed"}`;

  if (status === "success") {
    paymentStatus.innerHTML = `
      <strong>تم الرجوع من بوابة الدفع</strong>
      <span>إذا اكتملت عملية الدفع، راح يظهر الطلب في لوحة MyFatoorah. رقم الطلب: ${order || "غير متوفر"}</span>
    `;
  } else {
    paymentStatus.innerHTML = `
      <strong>الدفع ما اكتمل</strong>
      <span>تقدر ترجع للسلة وتجرب مرة ثانية، أو تتواصل واتساب للاستفسار. رقم الطلب: ${order || "غير متوفر"}</span>
    `;
  }
}

function renderCategories() {
  const categories = ["All", ...new Set(products.map((product) => product.category))];
  categoryFilters.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = `chip${category === activeCategory ? " active" : ""}`;
    button.type = "button";
    button.textContent = category;
    button.addEventListener("click", () => {
      activeCategory = category;
      renderCategories();
      renderProducts();
    });
    categoryFilters.append(button);
  });
}

function createVariantControls(node, product) {
  const panel = node.querySelector(".swatches");
  panel.className = "variant-panel";
  panel.innerHTML = "";

  const sizeRow = document.createElement("div");
  sizeRow.className = "variant-row";
  sizeRow.innerHTML = `
    <label>المقاس</label>
    <select class="size-select" aria-label="اختيار المقاس">
      ${product.sizes.map((size) => `<option value="${size}">${size}</option>`).join("")}
    </select>
  `;

  const colorRow = document.createElement("div");
  colorRow.className = "variant-row";
  colorRow.innerHTML = '<span class="variant-label">اللون</span>';

  const colorOptions = document.createElement("div");
  colorOptions.className = "color-options";
  let selectedColor = product.colors[0];

  product.colors.forEach((color, index) => {
    const button = document.createElement("button");
    button.className = `color-choice${index === 0 ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="color-dot" style="background:${color.hex}"></span>
      <span>${color.name}</span>
    `;
    button.addEventListener("click", () => {
      selectedColor = color;
      colorOptions.querySelectorAll(".color-choice").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
    colorOptions.append(button);
  });

  colorRow.append(colorOptions);
  panel.append(sizeRow, colorRow);

  return {
    getOptions() {
      return {
        size: sizeRow.querySelector(".size-select").value,
        colorName: selectedColor.name,
        colorHex: selectedColor.hex,
      };
    },
  };
}

function renderProducts() {
  productsGrid.innerHTML = "";

  filteredProducts().forEach((product) => {
    const node = productTemplate.content.firstElementChild.cloneNode(true);
    const visual = node.querySelector(".product-visual");

    visual.style.setProperty("--tone-a", product.tones[0]);
    visual.style.setProperty("--tone-b", product.tones[1]);

    if (product.image) {
      visual.classList.add("has-image");
      visual.textContent = "";
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;
      visual.append(image);
    } else {
      node.querySelector(".product-icon").textContent = product.icon;
    }

    const controls = createVariantControls(node, product);

    node.querySelector(".product-category").textContent = product.category;
    node.querySelector(".product-badge").textContent = product.badge;
    node.querySelector("h3").textContent = product.name;
    node.querySelector("p").textContent = product.description;
    node.querySelector("strong").textContent = formatPrice(product.price);
    node.querySelector("button").addEventListener("click", () => addToCart(product.id, controls.getOptions()));

    productsGrid.append(node);
  });

  if (!productsGrid.children.length) {
    productsGrid.innerHTML = '<p class="empty-cart">ماكو منتجات مطابقة للبحث الحالي.</p>';
  }
}

function addToCart(id, options) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  const key = variantKey(id, options.size, options.colorName);
  const existing = cart.get(key);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.set(key, {
      key,
      id,
      size: options.size,
      color: options.colorName,
      colorHex: options.colorHex,
      quantity: 1,
    });
  }

  renderCart();
  openCart();
}

function changeQuantity(key, delta) {
  const item = cart.get(key);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart.delete(key);
  }

  renderCart();
}

function cartSummary() {
  return [...cart.values()]
    .map((cartItem) => {
      const product = products.find((item) => item.id === cartItem.id);
      if (!product) return null;

      return {
        ...cartItem,
        name: product.name,
        category: product.category,
        price: product.price,
        lineTotal: product.price * cartItem.quantity,
      };
    })
    .filter(Boolean);
}

function cartTotals() {
  const items = cartSummary();
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const delivery = items.length ? deliveryFee : 0;
  const total = subtotal + delivery;
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return { items, subtotal, delivery, total, quantity };
}

function renderCart() {
  const { items, subtotal, delivery, total, quantity } = cartTotals();

  cartCount.textContent = quantity;
  cartSubtotal.textContent = formatPrice(subtotal);
  cartDelivery.textContent = formatPrice(delivery);
  cartTotal.textContent = formatPrice(total);
  cartItems.innerHTML = "";

  if (!items.length) {
    cartItems.innerHTML = '<p class="empty-cart">السلة فاضية حالياً.</p>';
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <small>المقاس: ${item.size} | اللون: ${item.color}</small>
        <div>${formatPrice(item.price)} × ${item.quantity}</div>
      </div>
      <div class="qty-controls" aria-label="تعديل كمية ${item.name}">
        <button type="button" data-action="minus">-</button>
        <span>${item.quantity}</span>
        <button type="button" data-action="plus">+</button>
      </div>
    `;
    row.querySelector('[data-action="minus"]').addEventListener("click", () => changeQuantity(item.key, -1));
    row.querySelector('[data-action="plus"]').addEventListener("click", () => changeQuantity(item.key, 1));
    cartItems.append(row);
  });
}

function openCart() {
  cartPanel.classList.add("open");
  scrim.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  scrim.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

function buildOrder(formData) {
  const { items, subtotal, delivery, total } = cartTotals();
  return {
    id: `JUL-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString(),
    customer: formData.get("customer"),
    mobile: formData.get("mobile"),
    address: {
      area: formData.get("area"),
      block: formData.get("block"),
      street: formData.get("street"),
      house: formData.get("house"),
      floor: formData.get("floor") || "",
    },
    notes: formData.get("notes") || "",
    payment: formData.get("payment"),
    items,
    subtotal,
    delivery,
    total,
    merchantEmail,
  };
}

function showPaymentState(order, message) {
  checkoutResult.hidden = false;
  checkoutResult.innerHTML = `
    <strong>رقم الطلب: ${order.id}</strong>
    <span>المنتجات: ${formatPrice(order.subtotal)}</span>
    <span>التوصيل: ${formatPrice(order.delivery)}</span>
    <span>الإجمالي: ${formatPrice(order.total)}</span>
    <span>الدفع: ${order.payment}</span>
    <span>${message}</span>
  `;
}

function setCheckoutLoading(isLoading) {
  checkoutButton.disabled = isLoading;
  checkoutButton.textContent = isLoading ? "جاري تجهيز الدفع..." : "متابعة للدفع";
}

async function createPayment(order) {
  const response = await fetch(paymentEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.ok || !data.paymentUrl) {
    throw new Error(data.message || "تعذر إنشاء رابط الدفع.");
  }

  return data;
}

document.querySelector(".cart-toggle").addEventListener("click", openCart);
document.querySelector(".cart-close").addEventListener("click", closeCart);
scrim.addEventListener("click", closeCart);

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  renderProducts();
});

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!cart.size) {
    openCart();
    return;
  }

  const formData = new FormData(checkoutForm);
  const order = buildOrder(formData);
  setCheckoutLoading(true);
  showPaymentState(order, "جاري تجهيز رابط الدفع من MyFatoorah...");

  try {
    const payment = await createPayment(order);
    showPaymentState(order, "تم إنشاء رابط الدفع. جاري تحويلك الآن...");
    window.location.href = payment.paymentUrl;
  } catch (error) {
    showPaymentState(order, `ما قدرنا نجهز رابط الدفع: ${error.message}`);
    setCheckoutLoading(false);
  }
});

renderPaymentStatus();
renderCategories();
renderProducts();
renderCart();
