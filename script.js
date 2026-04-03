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
   ABOUT IMAGE CAROUSEL
========================= */
const aboutSlides = document.querySelectorAll(".about-slide");
const aboutDots = document.querySelectorAll(".about-dot");
const aboutPrev = document.getElementById("aboutPrev");
const aboutNext = document.getElementById("aboutNext");

let aboutIndex = 0;

function showAboutSlide(index) {
  aboutSlides.forEach(slide => slide.classList.remove("active"));
  aboutDots.forEach(dot => dot.classList.remove("active"));

  aboutSlides[index].classList.add("active");
  aboutDots[index].classList.add("active");
}

if (aboutSlides.length > 0) {
  aboutPrev.addEventListener("click", () => {
    aboutIndex = (aboutIndex - 1 + aboutSlides.length) % aboutSlides.length;
    showAboutSlide(aboutIndex);
  });

  aboutNext.addEventListener("click", () => {
    aboutIndex = (aboutIndex + 1) % aboutSlides.length;
    showAboutSlide(aboutIndex);
  });

  aboutDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      aboutIndex = index;
      showAboutSlide(aboutIndex);
    });
  });

  // Optional auto-slide every 4 seconds
  setInterval(() => {
    aboutIndex = (aboutIndex + 1) % aboutSlides.length;
    showAboutSlide(aboutIndex);
  }, 4000);
}

/* =========================
   CERTIFICATE CAROUSEL
========================= */
const cerSlides = document.querySelectorAll(".cer-slide");
const cerDots = document.querySelectorAll(".cer-dot");
const cerPrev = document.getElementById("cerPrev");
const cerNext = document.getElementById("cerNext");

let cerIndex = 0;

function showCerSlide(index) {
  cerSlides.forEach(slide => slide.classList.remove("active"));
  cerDots.forEach(dot => dot.classList.remove("active"));

  if (cerSlides[index]) {
    cerSlides[index].classList.add("active");
  }

  if (cerDots[index]) {
    cerDots[index].classList.add("active");
  }
}

if (cerSlides.length > 0 && cerPrev && cerNext) {
  cerPrev.addEventListener("click", () => {
    cerIndex = (cerIndex - 1 + cerSlides.length) % cerSlides.length;
    showCerSlide(cerIndex);
  });

  cerNext.addEventListener("click", () => {
    cerIndex = (cerIndex + 1) % cerSlides.length;
    showCerSlide(cerIndex);
  });

  cerDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      cerIndex = index;
      showCerSlide(cerIndex);
    });
  });

  setInterval(() => {
    cerIndex = (cerIndex + 1) % cerSlides.length;
    showCerSlide(cerIndex);
  }, 4000);
}

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
  const modalLink = document.getElementById("modal-link");

  let currentImages = [];
  let currentLinks = [];
  let currentIndex = 0;
  let isWebsiteProject = false;

  function renderDots() {
    dotsContainer.innerHTML = "";

    currentImages.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");

      if (index === currentIndex) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        currentIndex = index;
        updateModalImage();
      });

      dotsContainer.appendChild(dot);
    });
  }

  function updateModalImage() {
    if (!currentImages.length) return;

    modalImg.src = currentImages[currentIndex];
    modalImg.alt = `Project Image ${currentIndex + 1}`;

    // Only WEBSITE project gets clickable links
    if (isWebsiteProject && currentLinks[currentIndex]) {
      modalLink.href = currentLinks[currentIndex];
      modalLink.style.pointerEvents = "auto";
      modalLink.style.cursor = "pointer";
      modalLink.target = "_blank";
    } else {
      modalLink.href = "#";
      modalLink.style.pointerEvents = "none";
      modalLink.style.cursor = "default";
    }

    renderDots();
    imageScroll.scrollTop = 0;
    imageScroll.scrollLeft = 0;
  }

  /* OPEN MODAL */
  document.querySelectorAll(".view-project").forEach(button => {
    button.addEventListener("click", (e) => {
      const btn = e.currentTarget;

      const title = btn.dataset.title || "";
      const desc = btn.dataset.description || "";
      const images = btn.dataset.images || "";
      const links = btn.dataset.links || "";

      currentImages = images
        .split(",")
        .map(img => img.trim())
        .filter(img => img !== "");

      currentLinks = links
        .split(",")
        .map(link => link.trim())
        .filter(link => link !== "");

      currentIndex = 0;

      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      // Only WEBSITE project should be clickable
      isWebsiteProject = title.toLowerCase().includes("website");

      updateModalImage();
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  /* PREV */
  prevBtn.addEventListener("click", () => {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateModalImage();
  });

  /* NEXT */
  nextBtn.addEventListener("click", () => {
    if (!currentImages.length) return;
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

      if (e.key === "ArrowRight" && currentImages.length) {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateModalImage();
      }

      if (e.key === "ArrowLeft" && currentImages.length) {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateModalImage();
      }
    }
  });
});