document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const closeBtn = document.getElementById("closeBtn");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const drawerPanel = document.getElementById("drawerPanel");

  const toggleDrawer = (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      hamburgerBtn.classList.add("hamburger-open");
      drawerBackdrop.classList.add("open");
      drawerBackdrop.classList.remove("pointer-events-none");
      drawerPanel.classList.add("open");
      closeBtn.style.opacity = "1";
      closeBtn.style.transform = "rotate(0deg)";
    } else {
      // Only remove overflow hidden if no overlays are open
      if (!document.querySelector(".page-overlay.open")) {
        document.body.style.overflow = "";
      }
      hamburgerBtn.classList.remove("hamburger-open");
      drawerBackdrop.classList.remove("open");
      drawerBackdrop.classList.add("pointer-events-none");
      drawerPanel.classList.remove("open");
      closeBtn.style.opacity = "0";
      closeBtn.style.transform = "rotate(90deg)";
    }
  };

  closeBtn.style.transform = "rotate(90deg)";
  closeBtn.style.opacity = "0";

  hamburgerBtn.addEventListener("click", () => toggleDrawer(true));
  closeBtn.addEventListener("click", () => toggleDrawer(false));
  drawerBackdrop.addEventListener("click", () => toggleDrawer(false));

  // Overlay Logic
  const globalCloseOverlay = document.getElementById("globalCloseOverlay");
  const overlays = {
    about: document.getElementById("about-overlay"),
    projects: document.getElementById("projects-overlay"),
    contact: document.getElementById("contact-overlay"),
    resume: document.getElementById("resume-overlay"),
  };

  const openOverlay = (id) => {
    // Close drawer if open
    toggleDrawer(false);

    // Close any currently open overlays
    Object.values(overlays).forEach((overlay) => {
      if (overlay) overlay.classList.remove("open");
    });

    const target = overlays[id];
    if (target) {
      document.body.style.overflow = "hidden";
      target.classList.add("open");
      target.scrollTo(0, 0); // reset scroll

      // Show close button
      globalCloseOverlay.classList.add("show");
    }
  };

  const closeAllOverlays = () => {
    Object.values(overlays).forEach((overlay) => {
      if (overlay) overlay.classList.remove("open");
    });
    globalCloseOverlay.classList.remove("show");
    document.body.style.overflow = "";
  };

  globalCloseOverlay.addEventListener("click", closeAllOverlays);

  // Bind navigation links
  // We look for all links that contain the text 'About', 'Projects', or 'Contact'
  document.querySelectorAll("a").forEach((link) => {
    const text = link.textContent.trim().toLowerCase();
    if (overlays[text]) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openOverlay(text);
      });
    }
  });
});
