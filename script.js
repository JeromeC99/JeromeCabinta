document.addEventListener("DOMContentLoaded", () => {
  /* MOBILE NAV */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  /* DARK MODE */
  const themeToggle = document.getElementById("theme-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

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
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));
/* =========================
   PROJECT MODAL + SLIDER
========================= */
const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeModal = document.querySelector(".close");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const dotsContainer = document.getElementById("slider-dots");
const imageScroll = document.getElementById("modal-image-scroll");

let currentImages = [];
let currentIndex = 0;

function renderDots() {
  dotsContainer.innerHTML = "";

  currentImages.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === currentIndex) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateModalImage();
    });

    dotsContainer.appendChild(dot);
  });
}

function updateModalImage() {
  modalImg.src = currentImages[currentIndex].trim();
  renderDots();

  imageScroll.scrollTop = 0;
  imageScroll.scrollLeft = 0;
}

/* OPEN MODAL */
document.querySelectorAll(".view-project").forEach(button => {
  button.addEventListener("click", (e) => {

    const btn = e.currentTarget;

    const title = btn.dataset.title;
    const desc = btn.dataset.description;
    const images = btn.dataset.images || "";

    currentImages = images
      ? images.split(",").map(img => img.trim())
      : [];

    currentIndex = 0;

    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    updateModalImage();
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

/* PREV / NEXT */
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateModalImage();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateModalImage();
});

/* CLOSE */
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "block") {
    if (e.key === "Escape") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateModalImage();
    }
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateModalImage();
    }
  }
});
});