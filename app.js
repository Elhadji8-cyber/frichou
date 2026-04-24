"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Check for GSAP
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger not found.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Helper: split text into word spans ---------- */
  function splitToWords(el) {
    if (!el || el.dataset.splitWords === "true") return el.querySelectorAll("span.word") || [];
    const text = el.textContent.trim();
    const tokens = text.split(/(\s+)/);
    const html = tokens
      .map(tok => {
        if (/\s+/.test(tok)) return tok.replace(/\n/g, "<br/>"); 
        return `<span class="word" aria-hidden="true">${tok}</span>`;
      })
      .join("");
    el.setAttribute("aria-label", text); 
    el.innerHTML = html;
    el.dataset.splitWords = "true";
    return el.querySelectorAll("span.word");
  }

  /* ---------- 1) Sidebar Logic ---------- */
  (function sidebarImproved() {
    const hamburger = document.querySelector(".hamburger");
    const sitebar = document.querySelector(".sitebar");

    if (!hamburger || !sitebar) return;

    let overlay = document.querySelector(".sitebar-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "sitebar-overlay";
      document.body.appendChild(overlay);
    }

    function openSidebar() {
      sitebar.classList.add("active");
      overlay.classList.add("active");
      document.documentElement.style.overflow = "hidden";
    }

    function closeSidebar() {
      sitebar.classList.remove("active");
      overlay.classList.remove("active");
      document.documentElement.style.overflow = "";
    }

    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      sitebar.classList.contains("active") ? closeSidebar() : openSidebar();
    });

    overlay.addEventListener("click", closeSidebar);

    sitebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 1024px)").matches) {
          setTimeout(() => closeSidebar(), 150);
        }
      });
    });
  })();

  /* ---------- 2) Smooth Reveals (Fade Up) ---------- */
  // Generic fade-up for images and cards
  const fadeUpElements = gsap.utils.toArray(".img-texte, .image-project, .image-project-2, .image-project-3, .svg1, .svg2");
  
  fadeUpElements.forEach((elem) => {
    if (!elem) return;
    gsap.from(elem, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });
  });

  /* ---------- 3) Text Reveal Animations ---------- */
  gsap.utils.toArray(".headline-texte, .moi-texte, .p-skills, #texte, #texte-2, #texte-3").forEach((container) => {
    const textElements = container.querySelectorAll("p, h1, h2, h3, span");
    textElements.forEach(el => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
    });
  });

  /* ---------- 4) Percentage Counters ---------- */
  const mm = gsap.matchMedia();

  mm.add({
    "(min-width: 1024px)": () => setupPourcentageAnimation(2),
    "(max-width: 1023px)": () => setupPourcentageAnimation(1.5)
  });

  function setupPourcentageAnimation(durationSeconds) {
    document.querySelectorAll(".pour100tage-1").forEach((elem) => {
      if (!elem) return;
      const p = elem.querySelector("article.pour100 p");
      const bar = elem.querySelector(".barre span");
      const target = parseInt((p ? p.textContent : "0").replace(/\D+/g, ""), 10) || 0;

      if (bar) gsap.set(bar, { width: "0%" });
      if (p) p.textContent = "0%";

      const counter = { value: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      tl.to(counter, {
        value: target,
        duration: durationSeconds,
        ease: "power3.out",
        onUpdate: () => {
          if (p) p.textContent = Math.round(counter.value) + "%";
        }
      }, 0)
      .to(bar || {}, { 
        width: target + "%",
        duration: durationSeconds,
        ease: "power3.out",
      }, 0);
    });
  }

  /* ---------- 5) Scrolling Marquee ---------- */
  const scrollingText = document.querySelector("#Scrolling h1");
  if (scrollingText) {
    gsap.to(scrollingText, {
      xPercent: -50,
      duration: 15,
      ease: "none",
      repeat: -1,
      yoyo: true
    });
  }

  const logicielImage = document.querySelector(".logiciel-image");
  if (logicielImage) {
    gsap.to(logicielImage, {
      xPercent: -50,
      duration: 20, // Plus lent et régulier
      ease: "none",
      repeat: -1
    });
  }

  const positionement = document.querySelector(".positionement");
  if (positionement) {
    gsap.to(positionement, {
      xPercent: -50,
      duration: 30, // Encore plus lent pour les cartes
      ease: "none",
      repeat: -1
    });
  }

  /* ---------- 6) Footer Animation ---------- */
  const footerElements = document.querySelectorAll(".le-foot-text, .foot-p, .the-social-media");
  footerElements.forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#footer",
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });
  });

  /* ---------- 7) CV Buttons ---------- */
  const cvBtn = document.getElementById("cvBtn");
  if (cvBtn) cvBtn.addEventListener("click", () => alert("Coming soon !"));

  const cvButtons = document.querySelectorAll("#cvButton");
  cvButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.href = "Skills.html";
    });
  });

});
