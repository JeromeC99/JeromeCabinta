document.addEventListener("DOMContentLoaded", () => {
  /* MOBILE MENU */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger?.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("active");

    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!expanded));
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* THEME TOGGLE */
  const themeToggle = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
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

      const img = card.querySelector("img");
      const title = card.querySelector("h3");
      const desc = card.querySelector("p");

      modalImg.src = img?.src || "";
      modalImg.alt = img?.alt || "Project preview";
      modalTitle.textContent = title?.textContent || "";
      modalDesc.textContent = desc?.textContent || "";

      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeProjectModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
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
});