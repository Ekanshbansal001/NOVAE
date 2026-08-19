/* ==========================================================================
   NOVAÉ — script.js
   All editable brand content lives in SITE_DATA below. Everything else
   wires up interactivity. No frameworks, no build step.
   ========================================================================== */

const SITE_DATA = {
  brand: {
    name: "NOVAÉ",
    whatsapp: "https://wa.me/910000000000",
    instagram: "https://instagram.com/",
    email: "hello@novae.example"
  },

  products: [
    {
      id: "cocoa-bites",
      name: "Dark Cocoa Bites",
      category: "food",
      price: 299,
      image: "https://images.unsplash.com/photo-1548907040-4baa419e9f6c?auto=format&fit=crop&w=900&q=80",
      tag: "Bestseller",
      desc: "Rich 70% cocoa, lightly crisp, endlessly snackable."
    },
    {
      id: "sea-salt-crunch",
      name: "Sea Salt Crunch",
      category: "food",
      price: 249,
      image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=80",
      tag: "New",
      desc: "Toasted nut clusters finished with flaked sea salt."
    },
    {
      id: "citrus-spark",
      name: "Citrus Spark",
      category: "drinks",
      price: 199,
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80",
      tag: "Sparkling",
      desc: "Cold-pressed citrus, sparkling and bright."
    },
    {
      id: "cold-brew-original",
      name: "Cold Brew Original",
      category: "drinks",
      price: 249,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
      tag: "Signature",
      desc: "Slow-steeped, smooth, quietly bold."
    }
  ],

  testimonials: [
    { quote: "Beautiful packaging, incredible taste and easily one of my favourite everyday snacks.", author: "Riya M." },
    { quote: "The cold brew has genuinely replaced my usual coffee run. Smooth, never bitter.", author: "Karan D." },
    { quote: "Citrus Spark tastes like real fruit, not a syrup. Small thing that matters a lot.", author: "Ananya S." },
    { quote: "Ordered once for the branding, stayed for the taste. That's rare.", author: "Farhan I." }
  ],

  journal: [
    {
      title: "The NOVAÉ Philosophy",
      desc: "Why we build every product around restraint, not excess — and what that means for flavour.",
      image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Why Ingredients Matter",
      desc: "A closer look at how we choose what goes into every NOVAÉ recipe, and what we leave out.",
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Building Better Everyday Rituals",
      desc: "Small, repeatable moments — a morning pour, an afternoon bite — and why they deserve care.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
    }
  ]
};

/* ==========================================================================
   Utilities
   ========================================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-shown");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("is-shown"), 2400);
}

/* ==========================================================================
   Render: product grid
   ========================================================================== */
function renderProducts() {
  const grid = $("#productGrid");
  grid.innerHTML = SITE_DATA.products.map(p => `
    <article class="product-card reveal" data-reveal data-id="${p.id}">
      <div class="product-card__media">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="product-card__tag">${p.tag}</span>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="product-card__row">
          <span class="product-card__price">${formatPrice(p.price)}</span>
        </div>
        <div class="product-card__actions">
          <button class="btn btn--ghost product-card__view" data-id="${p.id}">View Product</button>
          <button class="btn btn--solid product-card__add" data-id="${p.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join("");

  $$(".product-card__add", grid).forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id);
    });
  });
  $$(".product-card__view", grid).forEach(btn => {
    btn.addEventListener("click", () => {
      const p = SITE_DATA.products.find(x => x.id === btn.dataset.id);
      if (p) showToast(`${p.name} — ${p.desc}`);
    });
  });

  observeReveals();
}

/* ==========================================================================
   Render: journal
   ========================================================================== */
function renderJournal() {
  const grid = $("#journalGrid");
  grid.innerHTML = SITE_DATA.journal.map(j => `
    <article class="journal-card reveal" data-reveal>
      <div class="journal-card__media">
        <img src="${j.image}" alt="${j.title}" loading="lazy">
      </div>
      <span class="eyebrow journal-card__eyebrow">Journal</span>
      <h3>${j.title}</h3>
      <p>${j.desc}</p>
      <button class="journal-card__link journal-read">Read More <span>&rarr;</span></button>
    </article>
  `).join("");

  $$(".journal-read", grid).forEach((btn, i) => {
    btn.addEventListener("click", () => {
      showToast(`“${SITE_DATA.journal[i].title}” — full story coming soon.`);
    });
  });

  observeReveals();
}

/* ==========================================================================
   Cart
   ========================================================================== */
const CART_KEY = "novae_cart_v1";
let cart = [];

function loadCart() {
  // Cart lives in memory only for this demo (no backend / storage dependency).
  cart = [];
}

function addToCart(id) {
  const product = SITE_DATA.products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  renderCart();
  openCart();
  showToast(`${product.name} added to your bag`);
}

function updateQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  renderCart();
}

function renderCart() {
  const itemsEl = $("#cartItems");
  const totalEl = $("#cartTotal");
  const countEl = $("#cartCount");

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  countEl.textContent = totalQty;
  countEl.style.display = totalQty > 0 ? "grid" : "none";

  if (cart.length === 0) {
    itemsEl.innerHTML = `<p class="cart-empty">Your bag is empty — for now.</p>`;
    totalEl.textContent = formatPrice(0);
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    const p = SITE_DATA.products.find(x => x.id === item.id);
    const lineTotal = p.price * item.qty;
    total += lineTotal;
    return `
      <div class="cart-item" data-id="${item.id}">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <div class="cart-item__name">${p.name}</div>
          <div class="cart-item__price">${formatPrice(p.price)}</div>
          <div class="cart-item__qty">
            <button class="qty-minus" data-id="${item.id}">&minus;</button>
            <span>${item.qty}</span>
            <button class="qty-plus" data-id="${item.id}">&plus;</button>
          </div>
        </div>
        <button class="cart-item__remove" data-id="${item.id}">Remove</button>
      </div>
    `;
  }).join("");

  totalEl.textContent = formatPrice(total);

  $$(".qty-plus", itemsEl).forEach(b => b.addEventListener("click", () => updateQty(b.dataset.id, 1)));
  $$(".qty-minus", itemsEl).forEach(b => b.addEventListener("click", () => updateQty(b.dataset.id, -1)));
  $$(".cart-item__remove", itemsEl).forEach(b => b.addEventListener("click", () => removeFromCart(b.dataset.id)));
}

function openCart() {
  $("#cartDrawer").classList.add("is-open");
  $("#cartScrim").classList.add("is-open");
}
function closeCart() {
  $("#cartDrawer").classList.remove("is-open");
  $("#cartScrim").classList.remove("is-open");
}

/* ==========================================================================
   Search
   ========================================================================== */
function openSearch() {
  $("#searchOverlay").classList.add("is-open");
  setTimeout(() => $("#searchInput").focus(), 250);
}
function closeSearch() {
  $("#searchOverlay").classList.remove("is-open");
  $("#searchInput").value = "";
  renderSearchResults("");
}
function renderSearchResults(query) {
  const el = $("#searchResults");
  const q = query.trim().toLowerCase();
  if (!q) { el.innerHTML = ""; return; }

  const matches = SITE_DATA.products.filter(p =>
    p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.includes(q)
  );

  if (matches.length === 0) {
    el.innerHTML = `<div class="search-results__empty">No products matching “${query}”.</div>`;
    return;
  }

  el.innerHTML = matches.map(p => `
    <a href="#collection" class="search-result" data-id="${p.id}">
      <span>${p.name}</span><span>${formatPrice(p.price)}</span>
    </a>
  `).join("");

  $$(".search-result", el).forEach(a => {
    a.addEventListener("click", () => closeSearch());
  });
}

/* ==========================================================================
   Testimonial slider
   ========================================================================== */
let testimonialIndex = 0;
let testimonialTimer = null;

function renderTestimonials() {
  const track = $("#testimonialTrack");
  const dots = $("#testimonialDots");

  track.innerHTML = SITE_DATA.testimonials.map((t, i) => `
    <figure class="testimonial ${i === 0 ? "is-active" : ""}">
      <p>“${t.quote}”</p>
      <span>&mdash; ${t.author}</span>
    </figure>
  `).join("");

  dots.innerHTML = SITE_DATA.testimonials.map((_, i) =>
    `<span class="${i === 0 ? "is-active" : ""}" data-index="${i}"></span>`
  ).join("");

  $$(".testimonial-dots span", dots).forEach(dot => {
    dot.addEventListener("click", () => goToTestimonial(Number(dot.dataset.index)));
  });

  $("#testimonialPrev").addEventListener("click", () => goToTestimonial(testimonialIndex - 1));
  $("#testimonialNext").addEventListener("click", () => goToTestimonial(testimonialIndex + 1));

  startTestimonialAuto();
}

function goToTestimonial(i) {
  const total = SITE_DATA.testimonials.length;
  testimonialIndex = (i + total) % total;

  $$(".testimonial").forEach((el, idx) => el.classList.toggle("is-active", idx === testimonialIndex));
  $$(".testimonial-dots span").forEach((el, idx) => el.classList.toggle("is-active", idx === testimonialIndex));

  startTestimonialAuto();
}

function startTestimonialAuto() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => goToTestimonial(testimonialIndex + 1), 6000);
}

/* ==========================================================================
   Navbar / mobile nav
   ========================================================================== */
function initNavbar() {
  const navbar = $("#navbar");
  const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const menuBtn = $("#menuToggle");
  const mobileNav = $("#mobileNav");
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    menuBtn.classList.toggle("is-open", isOpen);
    menuBtn.setAttribute("aria-expanded", isOpen);
  });
  $$("#mobileNav a").forEach(a => a.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    menuBtn.classList.remove("is-open");
  }));
}

/* ==========================================================================
   Smooth scroll for in-page anchors (native CSS already helps; this adds
   an offset so the sticky navbar never covers the target heading)
   ========================================================================== */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 84;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* ==========================================================================
   Reveal-on-scroll (IntersectionObserver)
   ========================================================================== */
let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });
  }
  $$("[data-reveal]").forEach(el => {
    if (!el.classList.contains("is-visible")) revealObserver.observe(el);
  });
}

/* ==========================================================================
   Tasting rail — signature scroll progress + colour-mood indicator
   ========================================================================== */
function initTastingRail() {
  const fill = $("#railFill");
  const label = $("#railLabel");
  if (!fill) return;

  const stops = [
    { id: "top", name: "Hero", color: "#5f6b3e" },
    { id: "collection", name: "Collection", color: "#5f6b3e" },
    { id: "foodDrinks", name: "Food & Drinks", color: "#6b2e4d" },
    { id: "story", name: "Our Story", color: "#c9a34e" },
    { id: "ingredients", name: "Ingredients", color: "#5f6b3e" },
    { id: "journal", name: "Journal", color: "#6b2e4d" }
  ].map(s => ({ ...s, el: document.getElementById(s.id) })).filter(s => s.el);

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    fill.style.height = (progress * 100) + "%";

    let current = stops[0];
    stops.forEach(s => {
      if (scrollTop + 140 >= s.el.offsetTop) current = s;
    });
    fill.style.background = current.color;
    label.textContent = current.name;
    label.style.color = current.color;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ==========================================================================
   Newsletter
   ========================================================================== */
function initNewsletter() {
  const form = $("#newsletterForm");
  const success = $("#newsletterSuccess");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#newsletterEmail").value.trim();
    if (!email) return;
    success.classList.add("is-shown");
    form.reset();
    showToast("You're on the list.");
    setTimeout(() => success.classList.remove("is-shown"), 5000);
  });
}

/* ==========================================================================
   Filter clicks from the Food/Drinks split section
   ========================================================================== */
function initSplitFilters() {
  $$("[data-filter]").forEach(link => {
    link.addEventListener("click", () => {
      sessionStorage.setItem("novae_filter", link.dataset.filter);
    });
  });
}

/* ==========================================================================
   Init
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  $("#footerYear").textContent = new Date().getFullYear();

  loadCart();
  renderProducts();
  renderCart();
  renderJournal();
  renderTestimonials();

  initNavbar();
  initSmoothScroll();
  initTastingRail();
  initNewsletter();
  initSplitFilters();
  observeReveals();

  // Search
  $("#searchToggle").addEventListener("click", openSearch);
  $("#searchClose").addEventListener("click", closeSearch);
  $("#searchInput").addEventListener("input", (e) => renderSearchResults(e.target.value));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeSearch(); closeCart(); }
  });

  // Cart
  $("#cartToggle").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#cartScrim").addEventListener("click", closeCart);
  $("#checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) { showToast("Your bag is empty"); return; }
    showToast("This is a portfolio demo — checkout isn't wired to a store.");
  });

  // Scroll cue
  const cue = $("#scrollCue");
  if (cue) {
    cue.addEventListener("click", () => {
      const target = $("#collection");
      if (target) window.scrollTo({ top: target.offsetTop - 84, behavior: "smooth" });
    });
  }
});
