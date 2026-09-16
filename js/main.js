/* ═══════════════════════════════════════════════════════════════
   SAMAEL · The Black Serpent — Interações
   ─────────────────────────────────────────────────────────────────
   ⚙ CONFIGURAÇÃO DO ADMINISTRADOR — edite apenas este bloco.
   ═══════════════════════════════════════════════════════════════ */

const CONFIG = {
  // Número no formato internacional, apenas dígitos: 55 + DDD + número
  whatsapp: "5561993118272",

  // Exibição amigável do número na seção de contato
  whatsappDisplay: "+55 (61) 99311-8272",

  // E-mail de contato
  email: "darksage.yy@gmail.com",

  // Links sociais — deixe "" para ocultar um item
  social: {
    Instagram: "",   // ex.: "https://instagram.com/seu_perfil"
    TikTok: "",      // ex.: "https://tiktok.com/@seu_perfil"
    YouTube: ""      // ex.: "https://youtube.com/@seu_canal"
  },

  // Frases da seção oráculo (troca automática em fade)
  quotes: [
    "“Nem toda luz cura. Algumas apenas expõem.”",
    "“O desejo sempre deixa rastros.”",
    "“A sombra não mente. Ela apenas espera.”",
    "“O oculto começa onde a máscara termina.”",
    "“Não pergunte às cartas aquilo que você não está disposto a encarar.”",
    "“A Serpente Negra não responde curiosidade vazia. Ela responde intenção.”"
  ]
};

/* ═══════════════════════════════════════════════════════════════
   Daqui para baixo: motor do site. Não é necessário editar.
   ═══════════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch =
    window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ── Contato: aplica WhatsApp e e-mail configurados ────────── */
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    const msg = el.getAttribute("data-msg") || "Olá, Samael. Gostaria de agendar uma consulta.";
    el.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-email]").forEach((el) => {
    const subject = el.getAttribute("data-subject") || "Solicitação de consulta";
    el.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}`;
  });

  const phoneDisplay = document.querySelector("[data-contact-phone-display]");
  if (phoneDisplay) phoneDisplay.textContent = CONFIG.whatsappDisplay;

  const emailDisplay = document.querySelector("[data-contact-email-display]");
  if (emailDisplay) emailDisplay.textContent = CONFIG.email;

  /* ── Links sociais ─────────────────────────────────────────── */
  const socialWrap = document.getElementById("socialLinks");
  if (socialWrap) {
    Object.entries(CONFIG.social).forEach(([name, url]) => {
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.textContent = name;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", `${name} de Samael`);
      socialWrap.appendChild(a);
    });
    if (!socialWrap.children.length) socialWrap.remove();
  }

  /* ── Ano do rodapé ─────────────────────────────────────────── */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ── Navegação: fundo ao rolar + menu mobile ───────────────── */
  const nav = document.getElementById("nav");
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");

  const onScrollNav = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ── Scroll reveal ─────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ── Oráculo: frases em fade ───────────────────────────────── */
  const quoteEl = document.getElementById("oracleQuote");
  if (quoteEl && CONFIG.quotes.length > 1) {
    let idx = 0;
    setInterval(() => {
      quoteEl.classList.add("is-fading");
      setTimeout(() => {
        idx = (idx + 1) % CONFIG.quotes.length;
        quoteEl.textContent = CONFIG.quotes[idx];
        quoteEl.classList.remove("is-fading");
      }, 1100);
    }, 6200);
  }

  /* ── Parallax do hero (mouse, somente desktop) ─────────────── */
  if (!isTouch && !prefersReducedMotion) {
    const layers = document.querySelectorAll(".parallax");
    const hero = document.querySelector(".hero");
    let raf = null;
    let mx = 0, my = 0;

    const render = () => {
      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || "10");
        layer.style.transform =
          `translate3d(${mx * depth}px, ${my * depth}px, 0)`;
      });
      raf = null;
    };

    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      mx = (e.clientX / r.width - 0.5) * -1;
      my = (e.clientY / r.height - 0.5) * -1;
      if (!raf) raf = requestAnimationFrame(render);
    }, { passive: true });
  }

  /* ── Cursor dourado (somente desktop) ──────────────────────── */
  if (!isTouch && !prefersReducedMotion) {
    const glow = document.querySelector(".cursor-glow");
    if (glow) {
      let gx = -100, gy = -100, tx = -100, ty = -100;
      let active = false;

      window.addEventListener("mousemove", (e) => {
        tx = e.clientX;
        ty = e.clientY;
        if (!active) {
          active = true;
          document.body.classList.add("has-cursor-glow");
          gx = tx; gy = ty;
          loop();
        }
      }, { passive: true });

      const loop = () => {
        gx += (tx - gx) * 0.18;
        gy += (ty - gy) * 0.18;
        glow.style.transform =
          `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
      };
    }
  }
})();
