// Harshitha J - Developer Portfolio Logic

document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }
      });
    });
  }

  // --- Scroll Animations ---
  const scrollElements = document.querySelectorAll(".scroll-animation");

  // Dynamically add classes for transition effects
  const sections = document.querySelectorAll(".section");
  const projectCards = document.querySelectorAll(".project-card");
  const skillCategories = document.querySelectorAll(".skill-category");
  const timelineItems = document.querySelectorAll(".timeline-item");

  sections.forEach((section) => section.classList.add("scroll-animation"));
  projectCards.forEach((card) => card.classList.add("scroll-animation"));
  skillCategories.forEach((category) => category.classList.add("scroll-animation"));
  timelineItems.forEach((item) => item.classList.add("scroll-animation"));

  // Add staggering delays for cards
  projectCards.forEach((card, index) => {
    card.classList.add(`delay-${(index % 4) + 1}`);
  });

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const handleScrollAnimation = () => {
    document.querySelectorAll(".scroll-animation").forEach((el) => {
      if (elementInView(el, 1.2)) {
        el.classList.add("animate");
      } else {
        el.classList.remove("animate");
      }
    });
  };

  window.addEventListener("scroll", handleScrollAnimation);
  // Trigger once on load
  handleScrollAnimation();

  // --- Active Nav Links on Scroll ---
  const allSections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  const updateActiveNavLink = () => {
    let current = "";
    allSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 220) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink();

  // --- Profile Image Fallback & Entrance ---
  const profileImage = document.querySelector(".profile-image");
  const profileContainer = document.querySelector(".profile-image-container");

  if (profileImage && profileContainer) {
    profileImage.addEventListener("error", function () {
      profileContainer.classList.add("no-image");
      profileImage.style.display = "none";

      const fallbackText = document.createElement("div");
      fallbackText.className = "fallback-text";
      fallbackText.innerHTML = '<i class="fas fa-user-circle"></i>';
      fallbackText.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 5rem;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      `;
      profileContainer.appendChild(fallbackText);
    });

    if (profileImage.complete) {
      profileImage.style.opacity = "1";
    } else {
      profileImage.addEventListener("load", function () {
        profileImage.style.opacity = "0";
        profileImage.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
          profileImage.style.opacity = "1";
        }, 100);
      });
    }
  }

  // --- Hero Section Float ---
  const heroImageContainer = document.querySelector(".hero-image");
  if (heroImageContainer) {
    heroImageContainer.classList.add("float");
  }

  // --- Button Micro-interactions ---
  const primaryButtons = document.querySelectorAll(".btn-primary");
  primaryButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.classList.add("pulse");
    });
    btn.addEventListener("mouseleave", () => {
      btn.classList.remove("pulse");
    });
  });
});
