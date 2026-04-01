document.addEventListener("DOMContentLoaded", () => {
  /* MOBILE NAV */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  /* DARK MODE */
  const themeToggle = document.getElementById("theme-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  /* SCROLL ANIMATION */
  const animatedElements = document.querySelectorAll(
    ".section, .project-card, .skill-card, .testimonial-card, .info-card, .soft-skills-box, .contact-box, .service-card"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.12 });

  animatedElements.forEach(el => observer.observe(el));

  /* PROJECT MODAL SLIDER */
  const modal = document.getElementById("project-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeModal = document.querySelector(".close");
  const projectButtons = document.querySelectorAll(".view-project");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const sliderDots = document.getElementById("slider-dots");

  let currentImages = [];
  let currentIndex = 0;

  function updateSlider() {
    if (!currentImages.length) return;

    modalImg.src = currentImages[currentIndex];
    modalImg.alt = `Project Image ${currentIndex + 1}`;

    sliderDots.innerHTML = "";
    currentImages.forEach((_, index) => {
      const dot = document.createElement("span");
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
      sliderDots.appendChild(dot);
    });
  }

  projectButtons.forEach(button => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      const description = button.getAttribute("data-description");
      const images = button.getAttribute("data-images");

      currentImages = images.split(",");
      currentIndex = 0;

      modalTitle.textContent = title;
      modalDesc.textContent = description;

      updateSlider();

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  function closeProjectModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeProjectModal);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateSlider();
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "Escape") {
        closeProjectModal();
      } else if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateSlider();
      } else if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateSlider();
      }
    }
  });
});