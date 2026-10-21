/*
  Shared behaviour for every design option:
  image markup, page switching, full-screen viewer, scroll reveal, CV.
  Each design page sets window.MD_BASE (path back to the designs folder)
  before loading this file.
*/
(function () {
  const BASE = window.MD_BASE || "..";
  const WORKS = window.WORKS || [];
  // ?proof swaps artwork for flat color blocks (used for layout checks only)
  const PROOF = new URLSearchParams(location.search).has("proof");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function src(work, size) {
    if (PROOF) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${work.w}" height="${work.h}" viewBox="0 0 ${work.w} ${work.h}"><rect width="100%" height="100%" fill="${work.tone}"/><text x="50%" y="50%" fill="rgba(0,0,0,.35)" font-family="sans-serif" font-size="${work.w / 14}" text-anchor="middle" dominant-baseline="middle">${esc(work.title)}</text></svg>`;
      return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    }
    return `${BASE}/images/${size}/${work.file}.jpg`;
  }

  function img(work, size = "full", cls = "") {
    return `<img class="${cls}" src="${src(work, size)}" width="${work.w}" height="${work.h}" alt="${esc(work.title)}${work.details ? ", " + esc(work.details) : ""}" loading="lazy" decoding="async" style="background:${work.tone}" draggable="false">`;
  }

  // Works in one medium ("painting", "drawing", ...), each with its index in
  // WORKS (that index is what data-open uses). Order is the same as WORKS.
  function byMedium(id) {
    return WORKS.map((w, i) => ({ w, i })).filter((x) => x.w.medium === id);
  }
  // Same, for a collection ("recent" / "past")
  function byCollection(id) {
    return WORKS.map((w, i) => ({ w, i })).filter((x) => x.w.collection === id);
  }

  // Headshot and logo. In ?proof mode these become neutral placeholders too.
  function headshot(cls = "") {
    const S = window.SITE;
    const url = PROOF
      ? "data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1488"><rect width="100%" height="100%" fill="#8a8a8a"/><text x="50%" y="50%" fill="rgba(0,0,0,.35)" font-family="sans-serif" font-size="80" text-anchor="middle">Headshot</text></svg>')
      : `${BASE}/${S.headshot}`;
    return `<img class="${cls}" src="${url}" width="1000" height="1488" alt="Portrait of Marika Dunne" loading="lazy" decoding="async">`;
  }
  function logo(cls = "", light = false) {
    const S = window.SITE;
    const ink = light ? "#ece7df" : "#1c1b19";
    const url = PROOF
      ? "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="594" height="600" viewBox="0 0 594 600"><circle cx="297" cy="300" r="280" fill="none" stroke="${ink}" stroke-width="22"/><circle cx="297" cy="300" r="120" fill="none" stroke="${ink}" stroke-width="22"/></svg>`)
      : `${BASE}/${light ? S.logoLight : S.logo}`;
    return `<img class="${cls}" src="${url}" width="594" height="600" alt="Marika Dunne logo" decoding="async">`;
  }

  // Caption line under the title (sep may be HTML, e.g. "<br>").
  // Shows a soft placeholder until details exist.
  function meta(work, sep = " · ") {
    const parts = [work.details, work.size, work.year].filter(Boolean);
    if (parts.length) return parts.map(esc).join(sep);
    // no details yet: show the medium (e.g. "Painting") if known
    const m = (window.MEDIA || []).find((x) => x.id === work.medium);
    return m ? `<span class="tbd">${esc(m.title)}</span>` : `<span class="tbd">Medium${sep}Dimensions</span>`;
  }

  /* ---------- Pages ---------- */
  function router() {
    const pages = [...document.querySelectorAll("[data-page]")];
    const links = [...document.querySelectorAll("[data-nav]")];
    const fallback = pages[0] && pages[0].dataset.page;
    let first = true;
    function show() {
      const name = location.hash.slice(1) || fallback;
      const target = pages.find((p) => p.dataset.page === name) ? name : fallback;
      pages.forEach((p) => (p.hidden = p.dataset.page !== target));
      links.forEach((a) => a.classList.toggle("is-active", a.dataset.nav === target));
      document.body.dataset.current = target;
      if (!first) window.scrollTo({ top: 0, behavior: "instant" });
      first = false;
      document.dispatchEvent(new CustomEvent("md:page", { detail: target }));
    }
    addEventListener("hashchange", show);
    show();
  }

  /* ---------- Scroll reveal ---------- */
  function reveal(selector) {
    const els = document.querySelectorAll(selector);
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach((el) => {
      // anything already on screen shows right away
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0 && el.offsetParent !== null) el.classList.add("is-in");
      else io.observe(el);
    });
  }

  /* ---------- Full-screen viewer ---------- */
  // list = indices (into WORKS) of the works being browsed; pos = place in it
  const lb = { el: null, list: [], pos: 0, lastFocus: null };

  const icon = {
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 7 12l8 8"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>',
  };

  function buildLightbox() {
    const el = document.createElement("div");
    el.className = "lb";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Artwork viewer");
    el.hidden = true;
    el.innerHTML = `
      <button class="lb-btn lb-close" aria-label="Close">${icon.close}</button>
      <button class="lb-btn lb-prev" aria-label="Previous work">${icon.prev}</button>
      <button class="lb-btn lb-next" aria-label="Next work">${icon.next}</button>
      <figure class="lb-stage">
        <div class="lb-frame"><img class="lb-img" alt=""></div>
        <figcaption class="lb-cap">
          <span class="lb-title"></span>
          <span class="lb-meta"></span>
          <span class="lb-count"></span>
        </figcaption>
      </figure>`;
    document.body.appendChild(el);

    el.querySelector(".lb-close").addEventListener("click", close);
    el.querySelector(".lb-prev").addEventListener("click", () => go(-1));
    el.querySelector(".lb-next").addEventListener("click", () => go(1));
    el.addEventListener("click", (e) => {
      if (e.target === el || e.target.classList.contains("lb-stage") || e.target.classList.contains("lb-frame")) close();
    });

    // swipe
    let x0 = null, y0 = null;
    el.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
      x0 = y0 = null;
    });

    document.addEventListener("keydown", (e) => {
      if (el.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // keep focus inside the viewer
        const f = [...el.querySelectorAll("button")];
        const idx = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    return el;
  }

  function render() {
    const w = WORKS[lb.list[lb.pos]];
    const im = lb.el.querySelector(".lb-img");
    lb.el.classList.add("is-swapping");
    const next = new Image();
    next.onload = next.onerror = () => {
      im.src = next.src;
      im.width = w.w;
      im.height = w.h;
      im.alt = w.title;
      im.style.aspectRatio = `${w.w} / ${w.h}`;
      lb.el.querySelector(".lb-title").textContent = w.title;
      lb.el.querySelector(".lb-meta").innerHTML = meta(w);
      lb.el.querySelector(".lb-count").textContent = `${lb.pos + 1} / ${lb.list.length}`;
      requestAnimationFrame(() => lb.el.classList.remove("is-swapping"));
    };
    next.src = src(w, "full");
    // warm up neighbours
    const n = lb.list.length;
    [1, -1].forEach((d) => { new Image().src = src(WORKS[lb.list[(lb.pos + d + n) % n]], "full"); });
  }

  // scope = a collection or medium id to browse only those works, or "all" (the default)
  function open(i, scope = "all") {
    if (!lb.el) lb.el = buildLightbox();
    // arrows move through the same set of works the visitor is looking at
    lb.list = WORKS.map((w, k) => k).filter((k) => scope === "all" || WORKS[k].collection === scope || WORKS[k].medium === scope);
    if (!lb.list.includes(i)) lb.list = WORKS.map((w, k) => k);
    lb.pos = lb.list.indexOf(i);
    lb.lastFocus = document.activeElement;
    lb.el.hidden = false;
    document.documentElement.classList.add("lb-lock");
    render();
    requestAnimationFrame(() => lb.el.classList.add("is-open"));
    lb.el.querySelector(".lb-close").focus({ preventScroll: true });
  }

  function close() {
    lb.el.classList.remove("is-open");
    document.documentElement.classList.remove("lb-lock");
    // wait for the fade-out (its length can differ per design) before hiding
    const ms = parseFloat(getComputedStyle(lb.el).transitionDuration) * 1000 || 0;
    setTimeout(() => { if (!lb.el.classList.contains("is-open")) lb.el.hidden = true; }, reduceMotion ? 0 : ms);
    if (lb.lastFocus) lb.lastFocus.focus({ preventScroll: true });
  }

  function go(d) {
    lb.pos = (lb.pos + d + lb.list.length) % lb.list.length;
    render();
  }

  // Changing page (nav link, back button) closes the viewer
  addEventListener("hashchange", () => { if (lb.el && !lb.el.hidden) close(); });

  // Any element with data-open="<index>" opens the viewer at that work
  // (add data-scope="<collection or medium>" to browse only those works).
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open]");
    if (!t) return;
    e.preventDefault();
    open(+t.dataset.open, t.dataset.scope);
  });
  document.addEventListener("keydown", (e) => {
    const t = e.target.closest && e.target.closest("[data-open]");
    if (t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(+t.dataset.open, t.dataset.scope); }
  });

  /* ---------- CV ---------- */
  function cv(container, { juriedLabel = "Juried" } = {}) {
    container.innerHTML = (window.CV || []).map(([heading, rows]) => `
      <section class="cv-section">
        <h3 class="cv-h">${esc(heading)}</h3>
        <ol class="cv-list">
          ${rows.map(([year, title, venue, juried]) => `
            <li class="cv-row${year ? " has-year" : ""}">
              <span class="cv-year">${esc(year)}</span>
              <span class="cv-body">
                <span class="cv-title">${esc(title)}</span>${venue ? `<span class="cv-venue">${esc(venue)}</span>` : ""}
              </span>
              ${juried ? `<span class="cv-juried">${esc(juriedLabel)}</span>` : ""}
            </li>`).join("")}
        </ol>
      </section>`).join("");
  }

  // Simple line icon for Instagram links (inherits the text color)
  const igIcon = '<svg class="ig-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/></svg>';
  function insertIcons() {
    document.querySelectorAll("[data-ig-icon]").forEach((el) => el.insertAdjacentHTML("afterbegin", igIcon));
  }

  /* ---------- Shared fill-ins ---------- */
  function fill() {
    const S = window.SITE;
    insertIcons();
    document.querySelectorAll("[data-fill]").forEach((el) => {
      const k = el.dataset.fill;
      if (k === "bio") el.innerHTML = window.BIO.map((p) => `<p>${esc(p)}</p>`).join("");
      else if (k === "statement") el.innerHTML = window.STATEMENT.map((p) => `<p>${esc(p)}</p>`).join("");
      else if (k === "email") { el.textContent = S.email; if (el.tagName === "A") el.href = "mailto:" + S.email; }
      else if (k === "instagram" || k === "ig-link" || k === "ig-handle") {
        // instagram = link showing "@handle"; ig-link = link only (keeps its own
        // content, e.g. an icon); ig-handle = just the "@handle" text
        if (!S.instagram) { document.querySelectorAll("[data-optional]").forEach((o) => (o.hidden = true)); return; }
        if (k !== "ig-link") el.textContent = "@" + S.instagram;
        if (el.tagName === "A") {
          el.href = `https://www.instagram.com/${S.instagram}/`;
          el.target = "_blank";
          el.rel = "noopener";
          if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", `Marika Dunne on Instagram (@${S.instagram})`);
        }
      }
      else if (k === "cvpdf") el.href = `${BASE}/${S.cvPdf}`;
      else if (k === "year") el.textContent = S.year;
      else if (k === "count") el.textContent = el.dataset.collection ? byCollection(el.dataset.collection).length : el.dataset.medium ? byMedium(el.dataset.medium).length : WORKS.length;
      else if (k === "headshot") el.innerHTML = headshot();
      else if (k === "logo") el.innerHTML = logo("", el.dataset.light !== undefined);
    });
  }

  window.MD = { WORKS, PROOF, esc, src, img, meta, byMedium, byCollection, headshot, logo, router, reveal, open, cv, fill };
})();
