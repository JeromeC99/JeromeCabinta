// ==========================
// SCRIPT.JS - Optimized
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  // ===== DARK MODE TOGGLE =====
  const themeToggle = document.getElementById("theme-toggle");

  // Apply saved theme on load
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    // Update localStorage
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });

  // ===== SMOOTH SCROLL =====
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ===== FADE-IN SECTIONS =====
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
});