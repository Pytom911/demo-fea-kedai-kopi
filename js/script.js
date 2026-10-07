document.addEventListener("DOMContentLoaded", () => {
  // Mobile Sidebar Navigation
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const sidebarClose = document.getElementById("sidebarClose");

  function openSidebar() {
    if (mobileSidebar) {
      mobileSidebar.classList.remove("translate-x-full");
      mobileSidebar.classList.add("translate-x-0");
    }
    if (sidebarBackdrop) {
      sidebarBackdrop.classList.remove("opacity-0", "pointer-events-none");
      sidebarBackdrop.classList.add("opacity-100", "pointer-events-auto");
    }
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    if (mobileSidebar) {
      mobileSidebar.classList.remove("translate-x-0");
      mobileSidebar.classList.add("translate-x-full");
    }
    if (sidebarBackdrop) {
      sidebarBackdrop.classList.remove("opacity-100", "pointer-events-auto");
      sidebarBackdrop.classList.add("opacity-0", "pointer-events-none");
    }
    document.body.style.overflow = "";
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", openSidebar);
  }
  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar);
  }
  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener("click", closeSidebar);
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileSidebar && !mobileSidebar.classList.contains("translate-x-full")) {
      closeSidebar();
    }
  });

  // Close sidebar on link click
  if (mobileSidebar) {
    mobileSidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeSidebar);
    });
  }

  // Menu Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => {
        b.classList.remove("active", "bg-ink", "text-white");
        b.classList.add("bg-white", "text-ink");
      });
      btn.classList.add("active", "bg-ink", "text-white");
      btn.classList.remove("bg-white", "text-ink");

      menuCards.forEach((card, index) => {
        const cat = card.getAttribute("data-cat");

        if (filter === "all" || cat === filter) {
          card.classList.remove("is-hidden");
          card.classList.add("is-entering");
          setTimeout(() => {
            card.classList.remove("is-entering");
          }, 10);
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  // Scroll Spy for desktop nav links
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
          link.classList.remove("text-primary");
          link.classList.add("text-muted");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("text-primary");
            link.classList.remove("text-muted");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", scrollSpy, { passive: true });

  // Reveal on Scroll
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

  document.querySelectorAll("section > div").forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
});
