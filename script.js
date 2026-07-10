document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initRevealAnimations();
  initThemeToggle();
  initNavbarEffects();
  initBackToTop();
  initScrollProgress();
  initFormValidation();
  initActiveNav();
  initPageTransitions();
  initStatsCounter();
  initTestimonials();
  initProjectSearcher();
  init3DTilt();
});


function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  window.addEventListener("load", () => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 450);
  });
}

function initRevealAnimations() {
  const selectors = [".reveal", ".reveal-left", ".reveal-right", ".reveal-scale", ".reveal-rotate", ".reveal-flip"];
  const elements = document.querySelectorAll(selectors.join(","));

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });

  elements.forEach((element) => observer.observe(element));
}

function initThemeToggle() {
  const button = document.getElementById("darkModeToggle");
  if (!button) return;

  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = storedTheme ? storedTheme === "dark" : prefersDark;

  setTheme(isDark);

  button.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark-mode"));
  });

  function setTheme(useDark) {
    document.body.classList.toggle("dark-mode", useDark);
    localStorage.setItem("theme", useDark ? "dark" : "light");
    button.innerHTML = useDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    button.setAttribute("aria-label", useDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

function initNavbarEffects() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const update = () => {
    navbar.classList.toggle("nav-compact", window.scrollY > 32);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  const update = () => {
    button.classList.toggle("show", window.scrollY > 500);
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initScrollProgress() {
  const progress = document.querySelector(".scroll-progress");
  if (!progress) return;

  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = total > 0 ? (window.scrollY / total) * 100 : 0;
    progress.style.width = `${percent}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initFormValidation() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const inputs = [...form.querySelectorAll("input, textarea")];

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateInput(input));
    input.addEventListener("input", () => {
      if (input.parentElement.classList.contains("error")) validateInput(input);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = inputs.every(validateInput);
    if (!isValid) return;

    const submit = form.querySelector('button[type="submit"]');
    if (!submit) return;

    const original = submit.innerHTML;
    submit.innerHTML = '<i class="fas fa-check"></i> Message ready';
    submit.disabled = true;
    form.reset();

    setTimeout(() => {
      submit.innerHTML = original;
      submit.disabled = false;
    }, 2200);
  });
}

function validateInput(input) {
  const parent = input.parentElement;
  const value = input.value.trim();
  const isEmail = input.type === "email";
  const isValid = value !== "" && (!isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

  parent.classList.toggle("error", !isValid);

  const message = parent.querySelector(".error-msg");
  if (message) {
    message.textContent = isEmail ? "Enter a valid email address." : "This field is required.";
  }

  return isValid;
}

function initActiveNav() {
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = document.querySelectorAll("section[id], header[id]");

  // Smooth scroll
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Scroll Spy using IntersectionObserver
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          links.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }
}

function initPageTransitions() {
  const transition = document.querySelector(".page-transition");
  if (!transition) return;

  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || event.metaKey || event.ctrlKey) return;

      event.preventDefault();
      transition.classList.add("active");
      setTimeout(() => {
        window.location.href = href;
      }, 260);
    });
  });
}

function initStatsCounter() {
  const numbers = document.querySelectorAll(".stat-number");
  if (!numbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number.parseInt(element.dataset.target || "0", 10);
      const suffix = element.dataset.suffix || "";
      animateCounter(element, target, suffix);
      observer.unobserve(element);
    });
  }, { threshold: 0.45 });

  numbers.forEach((number) => observer.observe(number));
}

function animateCounter(element, target, suffix) {
  const start = performance.now();
  const duration = 1500;

  const frame = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.round(target * eased)}${suffix}`;

    if (progress < 1) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

function initTestimonials() {
  const slides = [...document.querySelectorAll(".testimonial-slide")];
  const dots = [...document.querySelectorAll(".testimonial-dot")];
  if (!slides.length) return;

  let index = 0;

  const show = (nextIndex) => {
    index = nextIndex;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.style.display = active ? "block" : "none";
      slide.style.opacity = active ? "1" : "0";
    });

    dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
  };

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => show(dotIndex));
  });

  show(0);
  setInterval(() => show((index + 1) % slides.length), 5200);
}

function initProjectSearcher() {
  const searchInput = document.getElementById("explorerSearchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const fileItems = document.querySelectorAll(".file-icon-item");
  const previewPane = document.getElementById("explorerPreviewPane");
  const currentPathText = document.getElementById("currentPath");
  const navBackBtn = document.getElementById("navBack");

  if (!searchInput || !fileItems.length || !previewPane) return;

  let currentQuery = "";
  let currentFolder = "all";
  let selectedFileId = null;

  // Folder paths map for address bar
  const folderPaths = {
    all: "root / projects",
    web: "root / projects / web_apps",
    "dev-tools": "root / projects / dev_tools",
    backend: "root / projects / backend",
    "ai-security": "root / projects / ai_and_security"
  };

  // Render project details into preview pane
  const renderPreview = (projectId) => {
    if (!projectId) {
      previewPane.innerHTML = `
        <div class="preview-placeholder">
          <i class="far fa-file-alt"></i>
          <p>Select a project shortcut to inspect details.</p>
        </div>
      `;
      return;
    }

    const detailElement = document.getElementById(`detail-${projectId}`);
    if (!detailElement) return;

    const title = detailElement.getAttribute("data-title") || "";
    const iconClass = detailElement.getAttribute("data-icon") || "far fa-file-alt";
    const imgUrl = detailElement.getAttribute("data-img") || "";
    const svgCode = detailElement.getAttribute("data-svg") || "";
    const launchUrl = detailElement.getAttribute("data-link") || "#";
    const desc = detailElement.getAttribute("data-desc") || "";
    const tagsString = detailElement.getAttribute("data-tags") || "";
    const tags = tagsString ? tagsString.split(",") : [];

    let imageHtml = `<div class="preview-img-box no-img"><i class="${iconClass}"></i></div>`;
    if (imgUrl) {
      imageHtml = `
        <div class="preview-img-box">
          <img src="${imgUrl}" alt="${title} Preview Image" />
        </div>
      `;
    } else if (svgCode) {
      imageHtml = `
        <div class="preview-img-box">
          ${svgCode}
        </div>
      `;
    }

    const tagsHtml = tags.map(tag => `<span class="tech-tag">${tag}</span>`).join("");

    previewPane.innerHTML = `
      <div class="preview-content">
        ${imageHtml}
        <div class="preview-header">
          <div class="preview-icon-box">
            <i class="${iconClass}"></i>
          </div>
          <div class="preview-title-box">
            <h4>${title}</h4>
          </div>
        </div>
        <p class="preview-desc">${desc}</p>
        <div>
          <div class="preview-tags-label">Technologies</div>
          <div class="preview-tags">
            ${tagsHtml}
          </div>
        </div>
        <a href="${launchUrl}" target="_blank" rel="noreferrer" class="btn-premium" style="margin-top: 10px; width: 100%; text-align: center; justify-content: center;">
          Launch <i class="fas fa-arrow-up-right-from-square" style="margin-left: 6px;"></i>
        </a>
      </div>
    `;
  };

  const filterFiles = () => {
    const query = currentQuery.toLowerCase().trim();
    let visibleCount = 0;

    fileItems.forEach((item) => {
      const category = item.getAttribute("data-category") || "";
      const projectId = item.getAttribute("data-project-id") || "";
      
      const detailElement = document.getElementById(`detail-${projectId}`);
      let searchData = "";
      if (detailElement) {
        const title = detailElement.getAttribute("data-title") || "";
        const desc = detailElement.getAttribute("data-desc") || "";
        const tags = detailElement.getAttribute("data-tags") || "";
        searchData = `${title} ${desc} ${tags}`.toLowerCase();
      }

      const matchesSearch = !query || searchData.includes(query);
      const matchesFolder = currentFolder === "all" || category === currentFolder;

      if (matchesSearch && matchesFolder) {
        item.classList.remove("hidden");
        visibleCount++;
      } else {
        item.classList.add("hidden");
        // Deselect if hidden
        if (item.classList.contains("selected")) {
          item.classList.remove("selected");
          selectedFileId = null;
          renderPreview(null);
        }
      }
    });

    // Update back button state
    if (currentFolder !== "all" || currentQuery) {
      navBackBtn.removeAttribute("disabled");
    } else {
      navBackBtn.setAttribute("disabled", "true");
    }
  };

  // Search input events
  searchInput.addEventListener("input", (e) => {
    currentQuery = e.target.value;
    clearBtn.style.display = currentQuery ? "block" : "none";
    filterFiles();
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    currentQuery = "";
    clearBtn.style.display = "none";
    searchInput.focus();
    filterFiles();
  });

  // Sidebar item events
  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      sidebarItems.forEach((t) => {
        t.classList.remove("active");
        const icon = t.querySelector("i");
        if (icon) {
          icon.className = "far fa-folder";
        }
      });

      item.classList.add("active");
      const activeIcon = item.querySelector("i");
      if (activeIcon) {
        activeIcon.className = "far fa-folder-open";
      }

      currentFolder = item.getAttribute("data-folder") || "all";
      currentPathText.textContent = folderPaths[currentFolder] || folderPaths.all;
      filterFiles();
    });
  });

  // File click events
  fileItems.forEach((item) => {
    item.addEventListener("click", () => {
      fileItems.forEach(f => f.classList.remove("selected"));
      
      const projectId = item.getAttribute("data-project-id");
      if (selectedFileId === projectId) {
        // Deselect if clicked again
        selectedFileId = null;
        renderPreview(null);
      } else {
        item.classList.add("selected");
        selectedFileId = projectId;
        renderPreview(projectId);
      }
    });
  });

  // Back button event
  navBackBtn.addEventListener("click", () => {
    if (currentQuery) {
      searchInput.value = "";
      currentQuery = "";
      clearBtn.style.display = "none";
    }

    if (currentFolder !== "all") {
      // Find and click the 'all' sidebar item
      const allItem = document.querySelector('.sidebar-item[data-folder="all"]');
      if (allItem) allItem.click();
    } else {
      filterFiles();
    }
  });
}

function init3DTilt() {
  const cards = document.querySelectorAll(".bento-card, .explorer-window, .stat-card, .mentor-card, .timeline-content");
  
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const angleX = (yc - y) / 22;
      const angleY = (x - xc) / 22;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-4px)`;
      
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      card.style.setProperty("--x", `${pctX}%`);
      card.style.setProperty("--y", `${pctY}%`);
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.setProperty("--x", "50%");
      card.style.setProperty("--y", "50%");
    });
  });
}

