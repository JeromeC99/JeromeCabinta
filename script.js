document.addEventListener("DOMContentLoaded", () => {
  /* MOBILE MENU */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger?.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("active");
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
    });
  });

  /* THEME TOGGLE */
  const themeToggle = document.getElementById("theme-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    if (themeToggle) themeToggle.textContent = "🌙";
  }

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  /* PROJECT MODAL */
  const modal = document.getElementById("project-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeModal = document.querySelector(".close");

  document.querySelectorAll(".view-project").forEach(button => {
    button.addEventListener("click", e => {
      const card = e.target.closest(".project-card");
      if (!card) return;

      modalImg.src = card.querySelector("img").src;
      modalImg.alt = card.querySelector("img").alt;
      modalTitle.textContent = card.querySelector("h3").textContent;
      modalDesc.textContent = card.querySelector("p").textContent;

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  function closeProjectModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  closeModal?.addEventListener("click", closeProjectModal);

  window.addEventListener("click", e => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeProjectModal();
    }
  });

  /* SCROLL REVEAL */
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
});