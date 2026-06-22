const merchantEmail = "bedrhmood1@gmail.com";
const paymentEndpoint = "/api/create-payment";

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
    swatches: ["#111111", "#0d2338", "#f8f3e8"],
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
    swatches: ["#d2b47f", "#f4ead7", "#0d2338"],
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
    swatches: ["#ffffff", "#c7d2df", "#173653"],
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
    swatches: ["#0d2338", "#222222", "#d6d0c2"],
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
    swatches: ["#ece3d2", "#9b7a3c", "#071927"],
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
    swatches: ["#173653", "#d2b47f", "#f8f3e8"],
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
const cartTotal = document.querySelector("#cartTotal");
const searchInput = document.querySelector("#searchInput");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutResult = document.querySelector("#checkoutResult");
const checkoutButton = checkoutForm.querySelector('button[type="submit"]');

function formatPrice(value) {
  return `${Number(value).toFixed(3)} د.ك`;
}

function filteredProducts() {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  return products.filter((product) => {
    const byCategory = activeCategory === "All" || product.category === activeCategory;
    const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return byCategory && text.includes(normalizedSearch);
  });
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

    node.querySelector(".product-category").textContent = product.category;
    node.querySelector(".product-badge").textContent = product.badge;
    node.querySelector("h3").textContent = product.name;
    node.querySelector("p").textContent = product.description;
    node.querySelector("strong").textContent = formatPrice(product.price);
    node.querySelector("button").addEventListener("click", () => addToCart(product.id));

    const swatches = node.querySelector(".swatches");
    product.swatches.forEach((color) => {
      const swatch = document.createElement("span");
      swatch.style.backgroundColor = color;
      swatches.append(swatch);
    });

    productsGrid.append(node);
  });

  if (!productsGrid.children.length) {
    productsGrid.innerHTML = '<p class="empty-cart">ماكو منتجات مطابقة للبحث الحالي.</p>';
  }
}

function addToCart(id) {
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
  openCart();
}

function changeQuantity(id, delta) {
  const next = (cart.get(id) || 0) + delta;
  if (next <= 0) {
    cart.delete(id);
  } else {
    cart.set(id, next);
  }
  renderCart();
}

function cartSummary() {
  return [...cart.entries()]
    .map(([id, quantity]) => {
      const product = products.find((item) => item.id === id);
      if (!product) return null;
      return { ...product, quantity, lineTotal: product.price * quantity };
    })
    .filter(Boolean);
}

function cartTotals() {
  const items = cartSummary();
  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return { items, total, quantity };
}

function renderCart() {
  const { items, total, quantity } = cartTotals();

  cartCount.textContent = quantity;
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
        <div>${formatPrice(item.price)} × ${item.quantity}</div>
      </div>
      <div class="qty-controls" aria-label="تعديل كمية ${item.name}">
        <button type="button" data-action="minus">-</button>
        <span>${item.quantity}</span>
        <button type="button" data-action="plus">+</button>
      </div>
    `;
    row.querySelector('[data-action="minus"]').addEventListener("click", () => changeQuantity(item.id, -1));
    row.querySelector('[data-action="plus"]').addEventListener("click", () => changeQuantity(item.id, 1));
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
  const { items, total } = cartTotals();
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
    total,
    merchantEmail,
  };
}

function showPaymentState(order, message) {
  checkoutResult.hidden = false;
  checkoutResult.innerHTML = `
    <strong>رقم الطلب: ${order.id}</strong>
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

renderCategories();
renderProducts();
renderCart();
