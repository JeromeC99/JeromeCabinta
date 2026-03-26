document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE HAMBURGER TOGGLE
  ========================= */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
    });
  });

  /* =========================
     DARK / LIGHT THEME
  ========================= */
  const themeToggle = document.getElementById("theme-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  /* =========================
     FADE-IN SECTIONS
  ========================= */
  const sections = document.querySelectorAll(".section, .about, .skills-grid, .card-grid, .contact-wrapper");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(sec => observer.observe(sec));

  /* =========================
     PROJECT MODAL
  ========================= */
  const modal = document.getElementById("project-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeModal = document.querySelector(".modal .close");

  // Open modal when "View Project" button is clicked
  document.querySelectorAll(".view-project").forEach(button => {
    button.addEventListener("click", e => {
      const card = e.target.closest(".project-card");
      modalImg.src = card.querySelector("img").src;
      modalTitle.textContent = card.querySelector("h3").textContent;
      modalDesc.textContent = card.querySelector("p").textContent;
      modal.style.display = "block";
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => { modal.style.display = "none"; });
  window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

});