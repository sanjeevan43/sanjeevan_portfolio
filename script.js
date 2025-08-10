const toggleButton = document.getElementById("darkModeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
});

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      entry.target.style.opacity = '1';
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.style.animationPlayState = 'paused';
  observer.observe(section);
});

// Add click animation to nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  });
});

// Add typing effect to header text
const headerText = document.querySelector('header h1');
const originalText = headerText.textContent;
headerText.textContent = '';

let i = 0;
const typeWriter = () => {
  if (i < originalText.length) {
    headerText.textContent += originalText.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
};

setTimeout(typeWriter, 1000);

// Add particle effect on mouse move
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.9) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: ${body.classList.contains('dark-mode') ? '#4a90e2' : '#007BFF'};
      border-radius: 50%;
      pointer-events: none;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      animation: particleFade 1s ease-out forwards;
      z-index: 1000;
    `;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  }
});

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFade {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0) translateY(-50px); }
  }
`;
document.head.appendChild(style);

// Add smooth scroll with easing
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});