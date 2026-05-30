const state = {
  typingText: ["Full-Stack Developer", "iOS Developer", "Database Designer", "Product-minded Builder"],
  typeIndex: 0,
  charIndex: 0,
  isDeleting: false
};

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initRevealAnimations();
  initThemeToggle();
  initNavbarEffects();
  initBackToTop();
  initTypingEffect();
  initScrollProgress();
  initFormValidation();
  initActiveNav();
  initPageTransitions();
  initStatsCounter();
  initTestimonials();
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

function initTypingEffect() {
  const target = document.querySelector(".typing-text");
  if (!target) return;

  const tick = () => {
    const word = state.typingText[state.typeIndex];
    state.charIndex += state.isDeleting ? -1 : 1;
    target.textContent = word.slice(0, state.charIndex);

    let delay = state.isDeleting ? 52 : 82;

    if (!state.isDeleting && state.charIndex === word.length) {
      delay = 1350;
      state.isDeleting = true;
    }

    if (state.isDeleting && state.charIndex === 0) {
      state.isDeleting = false;
      state.typeIndex = (state.typeIndex + 1) % state.typingText.length;
      delay = 260;
    }

    window.setTimeout(tick, delay);
  };

  tick();
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
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const hrefPage = href.split("#")[0] || "index.html";
    if (hrefPage === currentPage) link.classList.add("active");
  });
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
