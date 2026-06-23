const merchantEmail = "bedrhmood1@gmail.com";
const paymentEndpoint = "/api/create-payment";
const deliveryFee = 1.5;

let products = [
  {
    id: "beach-tee-men",
    name: "Men Beach Tee",
    category: "T-Shirts",
    badge: "Beach",
    icon: "TEE",
    image: "assets/jul-beach-collection.jpg",
    imageFit: "cover",
    imagePosition: "42% 22%",
    price: 5.25,
    description: "تيشيرت رجالي خفيف من مجموعة البحر بتطريز JUL صغير.",
    tones: ["#071927", "#e8ddcf"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#071927" },
      { name: "White", hex: "#f8f5ee" },
      { name: "Sand", hex: "#c8b9a4" },
      { name: "Black", hex: "#111111" },
    ],
  },
  {
    id: "beach-shorts-men",
    name: "Men Beach Shorts",
    category: "Shorts",
    badge: "Swim",
    icon: "SHORTS",
    image: "assets/jul-beach-collection.jpg",
    imageFit: "cover",
    imagePosition: "42% 34%",
    price: 6.75,
    description: "شورت بحر رجالي سريع الجفاف بخصر مرن ورباط أمامي.",
    tones: ["#071927", "#b8d3e4"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#071927" },
      { name: "Sky Blue", hex: "#b8d3e4" },
      { name: "Sand", hex: "#c8b9a4" },
      { name: "Black", hex: "#111111" },
    ],
  },
  {
    id: "beach-tee-women",
    name: "Women Beach Tee",
    category: "T-Shirts",
    badge: "Beach",
    icon: "TEE",
    image: "assets/jul-beach-collection.jpg",
    imageFit: "cover",
    imagePosition: "40% 58%",
    price: 5.25,
    description: "تيشيرت نسائي خفيف ومريح مناسب للبحر واليوميات.",
    tones: ["#f8f5ee", "#071927"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#071927" },
      { name: "White", hex: "#f8f5ee" },
      { name: "Sand", hex: "#c8b9a4" },
      { name: "Black", hex: "#111111" },
    ],
  },
  {
    id: "beach-shorts-women",
    name: "Women Beach Shorts",
    category: "Shorts",
    badge: "Swim",
    icon: "SHORTS",
    image: "assets/jul-beach-collection.jpg",
    imageFit: "cover",
    imagePosition: "40% 70%",
    price: 6.5,
    description: "شورت نسائي خفيف بخصر مرن وتطريز JUL جانبي.",
    tones: ["#111111", "#b8d3e4"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Navy", hex: "#071927" },
      { name: "Sky Blue", hex: "#b8d3e4" },
      { name: "Sand", hex: "#c8b9a4" },
    ],
  },
  {
    id: "summer-oversized-tee",
    name: "Summer Oversized Tee",
    category: "T-Shirts",
    badge: "Summer",
    icon: "TEE",
    image: "assets/jul-summer-collection.jpg",
    imageFit: "cover",
    imagePosition: "36% 15%",
    price: 5.9,
    description: "تيشيرت أوفرسايز ناعم بتصميم بسيط وراحة عالية للصيف.",
    tones: ["#111111", "#f4eee4"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#f8f5ee" },
      { name: "Sand", hex: "#c8b9a4" },
      { name: "Navy", hex: "#071927" },
    ],
  },
  {
    id: "summer-shorts-men",
    name: "Men Summer Shorts",
    category: "Shorts",
    badge: "Comfort",
    icon: "SHORTS",
    image: "assets/jul-summer-collection.jpg",
    imageFit: "cover",
    imagePosition: "38% 43%",
    price: 6.25,
    description: "شورت صيفي رجالي بملمس ناعم ورباط عملي.",
    tones: ["#111111", "#d8d0c3"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Sand", hex: "#c8b9a4" },
      { name: "Charcoal", hex: "#303234" },
      { name: "White", hex: "#f8f5ee" },
    ],
  },
  {
    id: "rib-tank-top-women",
    name: "Women Rib Tank Top",
    category: "Tops",
    badge: "Soft",
    icon: "TOP",
    image: "assets/jul-summer-collection.jpg",
    imageFit: "cover",
    imagePosition: "38% 66%",
    price: 4.25,
    description: "توب نسائي خفيف بقصة مريحة للطلعات اليومية.",
    tones: ["#f8f5ee", "#111111"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#f8f5ee" },
      { name: "Stone", hex: "#d8d0c3" },
      { name: "Bone", hex: "#eee8dd" },
    ],
  },
  {
    id: "lounge-shorts-women",
    name: "Women Lounge Shorts",
    category: "Shorts",
    badge: "Everyday",
    icon: "SHORTS",
    image: "assets/jul-summer-collection.jpg",
    imageFit: "cover",
    imagePosition: "38% 78%",
    price: 5.75,
    description: "شورت نسائي يومي خفيف مع خصر مرن وتفاصيل نظيفة.",
    tones: ["#111111", "#eee8dd"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Sand", hex: "#c8b9a4" },
      { name: "Stone", hex: "#d8d0c3" },
      { name: "Bone", hex: "#eee8dd" },
    ],
  },
  {
    id: "washed-oversized-tee",
    name: "Washed Oversized Tee",
    category: "T-Shirts",
    badge: "Essential",
    icon: "TEE",
    image: "assets/jul-essential-collection.jpg",
    imageFit: "cover",
    imagePosition: "32% 22%",
    price: 6.9,
    description: "تيشيرت أوفرسايز بلمسة مغسولة وتطريز JUL على الصدر والظهر.",
    tones: ["#111111", "#eee8dd"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Bone", hex: "#eee8dd" },
    ],
  },
  {
    id: "heavy-logo-hoodie",
    name: "Heavy Logo Hoodie",
    category: "Hoodies",
    badge: "Heavy",
    icon: "HOODIE",
    image: "assets/jul-essential-collection.jpg",
    imageFit: "cover",
    imagePosition: "82% 30%",
    price: 14.9,
    description: "هودي ثقيل بقصة مريحة وتطريز JUL أمامي وخلفي.",
    tones: ["#202224", "#111111"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Charcoal", hex: "#303234" },
    ],
  },
  {
    id: "timeless-logo-tee",
    name: "Timeless Logo Tee",
    category: "T-Shirts",
    badge: "Timeless",
    icon: "TEE",
    image: "assets/jul-timeless-collection.jpg",
    imageFit: "cover",
    imagePosition: "34% 20%",
    price: 5.9,
    description: "تيشيرت JUL بتصميم هادئ يناسب كل يوم.",
    tones: ["#111111", "#c8b9a4"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Bone", hex: "#eee8dd" },
      { name: "Charcoal", hex: "#303234" },
      { name: "Taupe", hex: "#b9ad9e" },
    ],
  },
  {
    id: "relaxed-logo-hoodie",
    name: "Relaxed Logo Hoodie",
    category: "Hoodies",
    badge: "Comfort",
    icon: "HOODIE",
    image: "assets/jul-timeless-collection.jpg",
    imageFit: "cover",
    imagePosition: "36% 53%",
    price: 13.9,
    description: "هودي ناعم بقصة مريحة وشعار JUL مطرز.",
    tones: ["#eee8dd", "#111111"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Bone", hex: "#eee8dd" },
      { name: "Black", hex: "#111111" },
      { name: "Taupe", hex: "#b9ad9e" },
    ],
  },
  {
    id: "half-zip-pullover",
    name: "Half-Zip Pullover",
    category: "Pullovers",
    badge: "New",
    icon: "ZIP",
    image: "assets/jul-timeless-collection.jpg",
    imageFit: "cover",
    imagePosition: "82% 78%",
    price: 12.9,
    description: "سويتر نص زب أنيق وخفيف للبس اليومي.",
    tones: ["#303234", "#d8d0c3"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#303234" },
      { name: "Light Gray", hex: "#d8d8d2" },
      { name: "Taupe", hex: "#b9ad9e" },
    ],
  },
];

const productExtras = {
  "beach-tee-men": {
    details: ["حماية مناسبة للشمس للبس اليومي.", "قطن خفيف وقابل للتنفس.", "تطريز JUL صغير على الصدر."],
    stock: { default: 8, low: ["XXL::Navy"], soldOut: [] },
  },
  "beach-shorts-men": {
    details: ["سريع الجفاف.", "خصر مرن ورباط أمامي.", "مناسب للبحر والسفر."],
    stock: { default: 7, low: ["XL::Sky Blue"], soldOut: [] },
  },
  "beach-tee-women": {
    details: ["قصة خفيفة ومريحة.", "مناسب للبحر والمشاوير.", "تطريز JUL نظيف."],
    stock: { default: 8, low: ["XL::Sand"], soldOut: [] },
  },
  "beach-shorts-women": {
    details: ["قماش ناعم وخفيف.", "خصر مرن.", "طول عملي للطلعات الصيفية."],
    stock: { default: 7, low: ["XS::Sky Blue"], soldOut: [] },
  },
  "summer-oversized-tee": {
    details: ["قصة أوفرسايز.", "قطن ممتاز.", "مناسب للصيف واللبس اليومي."],
    stock: { default: 8, low: ["XXL::Black"], soldOut: [] },
  },
  "summer-shorts-men": {
    details: ["ملمس ناعم.", "قصة مريحة.", "رباط عملي للخصر."],
    stock: { default: 7, low: ["XL::White"], soldOut: [] },
  },
  "rib-tank-top-women": {
    details: ["خفيف ومريح.", "قصة مناسبة للحر.", "يناسب الشورتات اليومية."],
    stock: { default: 6, low: ["XS::Black"], soldOut: [] },
  },
  "lounge-shorts-women": {
    details: ["ناعم للبس اليومي.", "خصر مرن.", "ألوان هادئة وسهلة التنسيق."],
    stock: { default: 7, low: ["XL::Bone"], soldOut: [] },
  },
  "washed-oversized-tee": {
    details: ["ملمس مغسول.", "تطريز أمامي وخلفي.", "قصة واسعة ومريحة."],
    stock: { default: 6, low: ["XXL::Bone"], soldOut: [] },
  },
  "heavy-logo-hoodie": {
    details: ["قماش ثقيل ودافئ.", "جيب أمامي.", "تطريز JUL خلفي."],
    stock: { default: 5, low: ["XL::Charcoal"], soldOut: [] },
  },
  "timeless-logo-tee": {
    details: ["تصميم بسيط.", "يناسب كل يوم.", "تطريز JUL أمامي وخلفي."],
    stock: { default: 8, low: ["XXL::Taupe"], soldOut: [] },
  },
  "relaxed-logo-hoodie": {
    details: ["قصة مريحة.", "خامة ناعمة.", "شعار JUL مطرز."],
    stock: { default: 5, low: ["XL::Bone"], soldOut: [] },
  },
  "half-zip-pullover": {
    details: ["ياقة نص زب.", "خامة دافئة وخفيفة.", "مناسب للدوام والطلعات."],
    stock: { default: 5, low: ["XL::Charcoal"], soldOut: [] },
  },
};

function mergeProductConfig(baseProducts, config) {
  if (!config || !Array.isArray(config.products)) return baseProducts;

  return baseProducts
    .map((product) => {
      const override = config.products.find((item) => item.id === product.id);
      if (!override) return product;

      return {
        ...product,
        ...Object.fromEntries(
          Object.entries(override).filter(([key, value]) => value !== undefined && key !== "id")
        ),
      };
    })
    .filter((product) => product.active !== false);
}

async function loadProductConfig() {
  try {
    const response = await fetch(`products.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("products.json not found");
    const config = await response.json();
    products = mergeProductConfig(products, config);
  } catch {
    // Keep the built-in catalog when the optional admin file is unavailable.
  }
}

function productDetails(product) {
  return product.details || productExtras[product.id]?.details || [];
}

function stockRule(product) {
  return product.stock || productExtras[product.id]?.stock || { default: 5, low: [], soldOut: [] };
}

function stockKey(size, colorName) {
  return `${size}::${colorName}`;
}

function availableStock(productId, size, colorName) {
  const product = products.find((item) => item.id === productId);
  if (!product) return 0;

  const rule = stockRule(product);
  const key = stockKey(size, colorName);
  if (Array.isArray(rule.soldOut) && rule.soldOut.includes(key)) return 0;
  if (Array.isArray(rule.low) && rule.low.includes(key)) return 1;
  const value = Number.parseInt(rule.default, 10);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

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

function hexToRgb(hex) {
  const value = String(hex || "").replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((char) => char + char).join("")
    : value.padEnd(6, "0").slice(0, 6);
  const number = Number.parseInt(normalized, 16);
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

const colorPreviewCache = new Map();

async function createColorPreview(src, hex) {
  const cacheKey = `${src}::${hex}`;
  if (colorPreviewCache.has(cacheKey)) return colorPreviewCache.get(cacheKey);

  const previewPromise = loadImage(src)
    .then((image) => {
      const canvas = document.createElement("canvas");
      const width = image.naturalWidth || image.width;
      const height = image.naturalHeight || image.height;
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(image, 0, 0, width, height);

      const target = hexToRgb(hex);
      const targetAverage = (target.r + target.g + target.b) / 3;
      const imageData = context.getImageData(0, 0, width, height);
      const data = imageData.data;
      const background = { r: 0, g: 0, b: 0, count: 0 };
      const sampleStep = Math.max(1, Math.floor(Math.min(width, height) / 90));

      for (let y = 0; y < height; y += sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
          const xRatio = x / width;
          const yRatio = y / height;
          const isEdge = xRatio < 0.05 || xRatio > 0.95 || yRatio < 0.05 || yRatio > 0.95;
          if (!isEdge) continue;

          const edgeIndex = (y * width + x) * 4;
          if (data[edgeIndex + 3] < 10) continue;
          background.r += data[edgeIndex];
          background.g += data[edgeIndex + 1];
          background.b += data[edgeIndex + 2];
          background.count += 1;
        }
      }

      if (background.count) {
        background.r /= background.count;
        background.g /= background.count;
        background.b /= background.count;
      }

      for (let index = 0; index < data.length; index += 4) {
        const pixelIndex = index / 4;
        const x = pixelIndex % width;
        const y = Math.floor(pixelIndex / width);
        const xRatio = x / width;
        const yRatio = y / height;
        const centerX = (xRatio - 0.5) / 0.36;
        const centerY = (yRatio - 0.52) / 0.47;
        const centerWeight = centerX * centerX + centerY * centerY;
        const inProductArea = centerWeight < 1.05 && xRatio > 0.08 && xRatio < 0.92 && yRatio > 0.08 && yRatio < 0.94;
        if (!inProductArea || data[index + 3] < 10) continue;

        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        const saturation = max - min;
        const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        const backgroundDistance = Math.hypot(red - background.r, green - background.g, blue - background.b);
        const isGoldAccent = red > 125 && green > 82 && blue < 95 && red > blue + 42;
        const isCleanHighlight = luminance > 245 && saturation < 16;
        const likelyFabric = backgroundDistance > 24 || (centerWeight < 0.46 && luminance < 248);

        if (!likelyFabric || isGoldAccent || isCleanHighlight) continue;

        const shade = targetAverage > 180
          ? 0.64 + Math.min(luminance / 255, 0.42)
          : 0.36 + Math.min(luminance / 230, 0.52);
        const blend = Math.min(0.92, Math.max(0.72, backgroundDistance / 84));

        data[index] = Math.min(255, Math.round(red * (1 - blend) + target.r * shade * blend));
        data[index + 1] = Math.min(255, Math.round(green * (1 - blend) + target.g * shade * blend));
        data[index + 2] = Math.min(255, Math.round(blue * (1 - blend) + target.b * shade * blend));
      }

      context.putImageData(imageData, 0, 0);
      return canvas.toDataURL("image/png");
    })
    .catch(() => src);

  colorPreviewCache.set(cacheKey, previewPromise);
  return previewPromise;
}

function rgbToCss(rgb) {
  return `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`;
}

function mixRgb(from, to, amount) {
  return {
    r: from.r + (to.r - from.r) * amount,
    g: from.g + (to.g - from.g) * amount,
    b: from.b + (to.b - from.b) * amount,
  };
}

function productColorTone(hex) {
  const base = hexToRgb(hex);
  const luminance = 0.2126 * base.r + 0.7152 * base.g + 0.0722 * base.b;
  const dark = { r: 7, g: 23, b: 35 };
  const light = { r: 255, g: 250, b: 240 };
  const gold = { r: 184, g: 138, b: 62 };

  return {
    base: rgbToCss(base),
    shade: rgbToCss(mixRgb(base, dark, luminance > 170 ? 0.18 : 0.34)),
    highlight: rgbToCss(mixRgb(base, light, luminance > 170 ? 0.28 : 0.16)),
    ink: luminance > 178 ? "#0d2338" : "#fff8ea",
    accent: rgbToCss(gold),
    stitch: luminance > 178 ? "rgba(7, 23, 35, 0.42)" : "rgba(255, 250, 240, 0.58)",
  };
}

function productMockupSvg(product, color) {
  const tone = productColorTone(color.hex);
  const style = `--garment:${tone.base};--garment-shade:${tone.shade};--garment-highlight:${tone.highlight};--mockup-ink:${tone.ink};--mockup-accent:${tone.accent};--mockup-stitch:${tone.stitch};`;
  const julMark = '<text x="160" y="164" text-anchor="middle" fill="var(--mockup-accent)" font-size="34" font-weight="900" letter-spacing="8">JUL</text>';
  let garment = "";

  if (product.category === "T-Shirts") {
    garment = `
      <path d="M116 58h88l35 28 27 42-32 27-24-23v96H110v-96l-24 23-32-27 27-42z" fill="var(--garment)" stroke="var(--mockup-stitch)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M137 58c7 18 39 18 46 0h21c-5 24-24 38-44 38s-39-14-44-38z" fill="var(--garment-shade)" opacity=".82"/>
      <path d="M112 224h96" stroke="var(--mockup-stitch)" stroke-width="4" stroke-linecap="round"/>
      ${julMark}
    `;
  } else if (product.category === "Blazers") {
    garment = `
      <path d="M105 62h110l31 178H74z" fill="var(--garment)" stroke="var(--mockup-stitch)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M144 68h32l14 166h-60z" fill="#fbf4e6" opacity=".92"/>
      <path d="M107 66l51 52-34 116H74z" fill="var(--garment-shade)" opacity=".9"/>
      <path d="M213 66l-51 52 34 116h50z" fill="var(--garment-highlight)" opacity=".65"/>
      <path d="M128 85l30 33-28 28M192 85l-30 33 28 28" fill="none" stroke="var(--mockup-stitch)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="160" cy="154" r="4" fill="var(--mockup-accent)"/>
      <circle cx="160" cy="180" r="4" fill="var(--mockup-accent)"/>
    `;
  } else if (product.category === "Shirts") {
    garment = `
      <path d="M113 68h94l37 35v136H76V103z" fill="var(--garment)" stroke="var(--mockup-stitch)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M132 68l28 30 28-30 22 18-28 43-22-29-22 29-28-43z" fill="var(--garment-highlight)" opacity=".82" stroke="var(--mockup-stitch)" stroke-width="2" stroke-linejoin="round"/>
      <path d="M160 105v119" stroke="var(--mockup-stitch)" stroke-width="3" stroke-linecap="round"/>
      <circle cx="160" cy="133" r="4" fill="var(--mockup-accent)"/>
      <circle cx="160" cy="162" r="4" fill="var(--mockup-accent)"/>
      <circle cx="160" cy="191" r="4" fill="var(--mockup-accent)"/>
      <path d="M88 130h41M191 130h41" stroke="var(--mockup-stitch)" stroke-width="3" stroke-linecap="round"/>
    `;
  } else if (product.category === "Trousers") {
    garment = `
      <path d="M107 58h106l12 27-22 151h-52l-7-104-24 104H68L95 85z" fill="var(--garment)" stroke="var(--mockup-stitch)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M96 58h128v28H96z" fill="var(--garment-shade)" stroke="var(--mockup-stitch)" stroke-width="3"/>
      <path d="M160 88l-9 148M118 99l-17 116M199 99l-17 116" stroke="var(--mockup-stitch)" stroke-width="3" stroke-linecap="round" opacity=".78"/>
      <path d="M125 72h70" stroke="var(--mockup-accent)" stroke-width="4" stroke-linecap="round"/>
    `;
  } else if (product.category === "Sweaters") {
    garment = `
      <path d="M115 66h90l39 35 29 118-49 12-24-82v88H120v-88l-24 82-49-12 29-118z" fill="var(--garment)" stroke="var(--mockup-stitch)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M137 66c5 18 41 18 46 0" fill="none" stroke="var(--mockup-stitch)" stroke-width="8" stroke-linecap="round"/>
      <path d="M121 204h78M121 218h78M83 215l-33-8M237 215l33-8" stroke="var(--mockup-stitch)" stroke-width="4" stroke-linecap="round" opacity=".82"/>
      <path d="M132 108h56" stroke="var(--garment-highlight)" stroke-width="5" stroke-linecap="round" opacity=".6"/>
    `;
  } else {
    garment = `
      <path d="M94 80h132v35l-22 110h-63l-12-64-17 64H49L71 115z" fill="var(--garment)" stroke="var(--mockup-stitch)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M85 76h150v32H85z" fill="var(--garment-shade)" stroke="var(--mockup-stitch)" stroke-width="3"/>
      <path d="M160 110l-18 113M116 125l-13 75M204 125l-13 75" stroke="var(--mockup-stitch)" stroke-width="3" stroke-linecap="round" opacity=".78"/>
      <path d="M141 93c8 10 30 10 38 0" fill="none" stroke="var(--mockup-accent)" stroke-width="4" stroke-linecap="round"/>
    `;
  }

  return `
    <svg class="product-mockup" viewBox="0 0 320 285" role="img" aria-label="${product.name}" style="${style}">
      <rect x="0" y="0" width="320" height="285" rx="0" fill="#f6eddd"/>
      <path d="M0 0h320v285H0z" fill="url(#softWash)" opacity=".9"/>
      <defs>
        <linearGradient id="softWash" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#fffaf0"/>
          <stop offset=".55" stop-color="#efe0c6"/>
          <stop offset="1" stop-color="#f9f2e7"/>
        </linearGradient>
      </defs>
      <rect x="18" y="0" width="12" height="285" fill="#0d2338" opacity=".9"/>
      <rect x="290" y="0" width="12" height="285" fill="#0d2338" opacity=".9"/>
      <path d="M36 235c74-54 151-96 246-126" fill="none" stroke="var(--mockup-accent)" stroke-width="5" stroke-linecap="round" opacity=".58"/>
      <ellipse cx="160" cy="151" rx="112" ry="118" fill="#fffaf0" opacity=".68"/>
      <g class="mockup-garment">${garment}</g>
    </svg>
  `;
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

function createVariantControls(node, product, onColorChange) {
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
  const sizeSelect = sizeRow.querySelector(".size-select");

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
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectedColor = color;
      colorOptions.querySelectorAll(".color-choice").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      onColorChange(color);
    });
    colorOptions.append(button);
  });

  sizeSelect.addEventListener("change", () => onColorChange(selectedColor));

  colorRow.append(colorOptions);
  panel.append(sizeRow, colorRow);

  return {
    getOptions() {
      return {
        size: sizeSelect.value,
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
    visual.dataset.colorName = product.colors[0]?.name || "";

    if (product.image) {
      visual.classList.add("has-image");
      visual.textContent = "";
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;
      if (product.imageFit) image.style.objectFit = product.imageFit;
      if (product.imagePosition) image.style.objectPosition = product.imagePosition;
      visual.append(image);
    } else {
      node.querySelector(".product-icon").textContent = product.icon;
    }

    const updateProductColor = (color) => {
      visual.style.setProperty("--selected-color", color.hex);
      visual.dataset.colorName = color.name;
    };

    const controls = createVariantControls(node, product, updateProductColor);
    updateProductColor(product.colors[0]);

    const addButton = node.querySelector(".product-footer button");
    const stockStatus = node.querySelector(".stock-status");
    const specsList = node.querySelector(".product-specs");
    specsList.innerHTML = productDetails(product)
      .map((detail) => `<li>${detail}</li>`)
      .join("");

    const updateAvailability = () => {
      const options = controls.getOptions();
      const stock = availableStock(product.id, options.size, options.colorName);
      stockStatus.className = "stock-status";

      if (stock <= 0) {
        stockStatus.textContent = "غير متوفر بهذا اللون والمقاس";
        stockStatus.classList.add("sold-out");
        addButton.disabled = true;
        addButton.textContent = "Sold Out";
        return;
      }

      addButton.disabled = false;
      addButton.textContent = "Add to Cart";
      if (stock <= 2) {
        stockStatus.textContent = `باقي ${stock} فقط`;
        stockStatus.classList.add("low");
      } else {
        stockStatus.textContent = "متوفر للطلب";
      }
    };

    node.querySelector(".product-category").textContent = product.category;
    node.querySelector(".product-badge").textContent = product.badge;
    node.querySelector("h3").textContent = product.name;
    node.querySelector("p").textContent = product.description;
    node.querySelector("strong").textContent = formatPrice(product.price);
    addButton.addEventListener("click", () => addToCart(product.id, controls.getOptions()));
    node.querySelector(".size-select").addEventListener("change", updateAvailability);
    node.querySelectorAll(".color-choice").forEach((button) => button.addEventListener("click", updateAvailability));
    updateAvailability();

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
  const stock = availableStock(id, options.size, options.colorName);

  if (stock <= 0 || (existing?.quantity || 0) >= stock) {
    openCart();
    return;
  }

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

  const stock = availableStock(item.id, item.size, item.color);
  if (delta > 0 && item.quantity >= stock) return;

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
        stock: availableStock(cartItem.id, cartItem.size, cartItem.color),
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
    row.querySelector("small").textContent += ` | المتبقي: ${item.stock}`;
    row.querySelector('[data-action="minus"]').addEventListener("click", () => changeQuantity(item.key, -1));
    const plusButton = row.querySelector('[data-action="plus"]');
    plusButton.disabled = item.quantity >= item.stock;
    plusButton.addEventListener("click", () => changeQuantity(item.key, 1));
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

async function initStore() {
  await loadProductConfig();
  renderPaymentStatus();
  renderCategories();
  renderProducts();
  renderCart();
}

initStore();

