document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Navigation ---
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("bi-list");
        icon.classList.toggle("bi-x");
      }
    });

    // Close on link click
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.add("hidden");
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.classList.add("bi-list");
          icon.classList.remove("bi-x");
        }
      });
    });
  }

  // --- Menu Filter ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Active state
      filterBtns.forEach((b) => {
        b.classList.remove("active", "bg-ink", "text-white");
        b.classList.add("bg-white", "text-ink");
      });
      btn.classList.add("active", "bg-ink", "text-white");
      btn.classList.remove("bg-white", "text-ink");

      // Filter logic
      menuCards.forEach((card) => {
        const cat = card.getAttribute("data-cat");

        if (filter === "all" || cat === filter) {
          card.classList.remove("is-hidden");
          card.classList.add("is-entering");
          setTimeout(() => card.classList.remove("is-entering"), 10);
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  // --- Scroll Spy ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const scrollSpy = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("text-primary", "border-primary");
          link.classList.add("opacity-60");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("text-primary", "border-primary");
            link.classList.remove("opacity-60");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", scrollSpy);

  // --- Reveal on Scroll ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add reveal class to main blocks
  document
    .querySelectorAll(
      "section > div, section > h1, section > h2, .menu-card, #lokasi > div"
    )
    .forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });

  // --- Dynamic Year ---
  const yearEl = document.querySelector("footer b.block");
  if (yearEl && yearEl.innerText.includes("©")) {
    const currentYear = new Date().getFullYear();
    yearEl.innerHTML = yearEl.innerHTML.replace(/2026/, currentYear);
  }
});
