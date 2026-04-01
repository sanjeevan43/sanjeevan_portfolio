// --- Constants & State ---
const state = {
  typingText: ["Full-Stack Developer", "Database Designer", "Creative Coder", "iOS Developer"],
  typeIndex: 0,
  charIndex: 0,
  isDeleting: false,
  typeDelay: 200,
  eraseDelay: 100,
  nextWordDelay: 2000
};

// --- Initializer ---
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initRevealAnimations();
  initThemeToggle();
  initNavbarEffects();
  initBackToTop();
  initTypingEffect();
  initScrollProgress();
  initFormValidation();
  initActiveNav();
  initParallax();
  initCustomCursor();
  initPageTransitions();
  initStatsCounter();
  initTestimonials();
});

// 1. Preloader
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  window.addEventListener('load', () => {
    preloader.classList.add('fade-out');
    setTimeout(() => preloader.style.display = 'none', 800);
  });
}

// 2. Reveal Animations (Intersection Observer) - handles all variants
function initRevealAnimations() {
  const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale', '.reveal-rotate', '.reveal-flip'];
  const allRevealElements = document.querySelectorAll(revealClasses.join(','));
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  allRevealElements.forEach(el => observer.observe(el));
}

// 3. Theme Toggle
function initThemeToggle() {
  const btn = document.getElementById('darkModeToggle');
  if (!btn) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    btn.textContent = isDark ? '☀️' : '🌙';
    
    btn.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => btn.style.transform = 'none', 500);
  });
}

// 4. Navbar Effects
function initNavbarEffects() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const scrolly = window.scrollY;
    if (scrolly > 50) {
      navbar.style.top = '1rem';
      navbar.style.padding = '0.5rem 1.5rem';
      navbar.style.width = 'min(95%, 1100px)';
    } else {
      navbar.style.top = '1.5rem';
      navbar.style.padding = '0.75rem 1.5rem';
      navbar.style.width = 'min(90%, 1000px)';
    }
  }, { passive: true });
}

// 5. Back to Top
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 6. Typing Effect
function initTypingEffect() {
  const target = document.querySelector('.typing-text');
  if (!target) return;

  function type() {
    const currentWord = state.typingText[state.typeIndex];
    
    if (state.isDeleting) {
      target.textContent = currentWord.substring(0, state.charIndex - 1);
      state.charIndex--;
    } else {
      target.textContent = currentWord.substring(0, state.charIndex + 1);
      state.charIndex++;
    }

    let delay = state.isDeleting ? state.eraseDelay : state.typeDelay;

    if (!state.isDeleting && state.charIndex === currentWord.length) {
      state.isDeleting = true;
      delay = state.nextWordDelay;
    } else if (state.isDeleting && state.charIndex === 0) {
      state.isDeleting = false;
      state.typeIndex = (state.typeIndex + 1) % state.typingText.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  type();
}

// 7. Scroll Progress
function initScrollProgress() {
  const progress = document.querySelector('.scroll-progress');
  if (!progress) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / totalHeight) * 100;
    progress.style.width = scrollPercent + '%';
  });
}

// 8. Form Validation
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('error')) {
        validateInput(input);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateInput(input)) isFormValid = false;
    });

    if (isFormValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        submitBtn.style.background = 'var(--accent-secondary)';
        form.reset();
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    }
  });
}

function validateInput(input) {
  const parent = input.parentElement;
  const val = input.value.trim();
  let isValid = true;

  if (val === '') {
    isValid = false;
  } else if (input.type === 'email' && !/\S+@\S+\.\S+/.test(val)) {
    isValid = false;
  }

  if (!isValid) {
    parent.classList.add('error');
  } else {
    parent.classList.remove('error');
  }
  return isValid;
}

// 9. Active Nav Highlight
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current) && current !== '') {
        link.classList.add('active');
      }
    });
  });
}

// 10. Parallax Effect
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxEls = document.querySelectorAll('.parallax');
    parallaxEls.forEach(el => {
      const speed = el.dataset.speed || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// 11. Custom Cursor (Ring + Dot)
function initCustomCursor() {
  const ring = document.querySelector('.custom-cursor');
  const dot = document.querySelector('.cursor-dot');
  if (!ring || !dot || window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot follows instantly
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    dot.classList.add('active');
    ring.classList.add('active');
  });

  // Ring follows with smooth lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mouseleave', () => {
    ring.classList.remove('active');
    dot.classList.remove('active');
  });

  // Grow cursor on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .bento-card, .project-card, .stat-card, .github-card, .testimonial-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('hover');
      dot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('hover');
      dot.classList.remove('hover');
    });
  });
}

// 12. Page Transitions
function initPageTransitions() {
  const transition = document.querySelector('.page-transition');
  if (!transition) return;

  const internalLinks = document.querySelectorAll('a[href$=".html"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Skip external links or anchor links
      if (href.startsWith('http') || href.startsWith('#')) return;
      
      e.preventDefault();
      transition.classList.add('active');

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

// 13. Stats Counter Animation
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-target'));
        const suffix = target.getAttribute('data-suffix') || '';
        animateCounter(target, 0, endValue, 2000, suffix);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

function animateCounter(element, start, end, duration, suffix) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * (end - start) + start);

    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// 14. Testimonial Carousel
function initTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (testimonials.length === 0) return;

  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach(t => {
      t.style.display = 'none';
      t.style.opacity = '0';
    });
    dots.forEach(d => d.classList.remove('active'));

    testimonials[index].style.display = 'block';
    setTimeout(() => testimonials[index].style.opacity = '1', 50);
    if (dots[index]) dots[index].classList.add('active');
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      showTestimonial(currentIndex);
    });
  });

  // Auto-rotate every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 5000);

  showTestimonial(0);
}
