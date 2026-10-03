/* =========================================================
   SAKARYA WORKSHOP — ANA SCRIPT
   1. İletişim bağlantılarını config.js'ten doldurma
   2. Navbar (scroll durumu + mobil menü)
   3. Scroll'da yumuşak görünme animasyonu
   4. Galeri büyütme penceresi (lightbox)
   ========================================================= */

(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const body = document.body;

  /* ---------- 1. İletişim bağlantıları ---------- */
  function applyContactLinks() {
    const instagramUrl = "https://www.instagram.com/" + config.instagramUser + "/";
    const whatsappUrl =
      "https://wa.me/" + config.whatsappNumber +
      "?text=" + encodeURIComponent(config.whatsappMessage || "");

    // Google Maps: hazır paylaşım linki varsa onu, yoksa adres aramasını kullan
    const mapsUrl = config.mapsUrl
      ? config.mapsUrl
      : "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(config.mapsQuery || config.address || "");

    const map = {
      phone:     { href: "tel:" + config.phoneLink,  text: config.phoneDisplay },
      whatsapp:  { href: whatsappUrl,                 text: null },
      instagram: { href: instagramUrl,                text: "@" + config.instagramUser },
      email:     { href: "mailto:" + config.email,    text: config.email },
      address:   { href: null,                        text: config.address },
      maps:      { href: mapsUrl,                     text: config.address }
    };

    document.querySelectorAll("[data-contact]").forEach(function (el) {
      const item = map[el.dataset.contact];
      if (!item) return;

      if (item.href && el.tagName === "A") el.href = item.href;

      // Yazısı da güncellenecek öğeler "data-contact-text" taşır.
      // Değer verilirse (örn. data-contact-text="phone") o alanın yazısı kullanılır.
      // "Instagram" ya da "WhatsApp'tan yaz" gibi buton yazılarına dokunulmaz.
      if (el.hasAttribute("data-contact-text")) {
        const source = map[el.dataset.contactText] || item;
        if (source.text) el.textContent = source.text;
      }
    });

    const yearEl = document.querySelector("[data-year]");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- 2. Navbar ---------- */
  function initNav() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("main-nav");

    // Sayfa kaydırılınca navbar'a ince çizgi + arka plan ekle
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function setMenu(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
      body.classList.toggle("menu-open", open);
    }

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Menüden bir bağlantıya tıklanınca menüyü kapat
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("menu-open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Ekran büyütülünce açık kalan mobil menüyü kapat
    window.matchMedia("(min-width: 860px)").addEventListener("change", function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- 3. Scroll animasyonu ---------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 4. Galeri lightbox ---------- */
  function initLightbox() {
    const dialog = document.querySelector(".lightbox");
    if (!dialog || typeof dialog.showModal !== "function") return;

    const img = dialog.querySelector(".lb-img");
    const images = Array.from(document.querySelectorAll(".g-item img"));
    let current = 0;

    function show(index) {
      current = (index + images.length) % images.length;
      img.src = images[current].src;
      img.alt = images[current].alt;
    }

    images.forEach(function (image, i) {
      image.parentElement.addEventListener("click", function () {
        show(i);
        dialog.showModal();
      });
    });

    dialog.querySelector(".lb-close").addEventListener("click", function () { dialog.close(); });
    dialog.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    dialog.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });

    // Boş alana tıklayınca kapat
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- Başlat ---------- */
  applyContactLinks();
  initNav();
  initReveal();
  initLightbox();

  // Sayfa açılış animasyonunu tetikle
  requestAnimationFrame(function () { body.classList.add("is-loaded"); });
})();
