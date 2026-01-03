// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.querySelector("i").classList.toggle("fa-bars");
  menuToggle.querySelector("i").classList.toggle("fa-times");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.querySelector("i").classList.add("fa-bars");
    menuToggle.querySelector("i").classList.remove("fa-times");
  });
});

// Scroll animations
const scrollElements = document.querySelectorAll(".scroll-animation");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add("animate");
};

const hideScrollElement = (element) => {
  element.classList.remove("animate");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  });
};

// Initialize scroll animations
window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

// Set all elements with scroll-animation class
document.addEventListener("DOMContentLoaded", () => {
  // Add scroll-animation class to elements
  const sections = document.querySelectorAll(".section");
  const projectCards = document.querySelectorAll(".project-card");
  const skillCategories = document.querySelectorAll(".skill-category");
  const strengthCards = document.querySelectorAll(".strength-card");

  sections.forEach((section) => section.classList.add("scroll-animation"));
  projectCards.forEach((card) => card.classList.add("scroll-animation"));
  skillCategories.forEach((category) =>
    category.classList.add("scroll-animation")
  );
  strengthCards.forEach((card) => card.classList.add("scroll-animation"));

  // Add delay classes
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.classList.add(`delay-${(index % 4) + 1}`);
  });

  // Trigger initial animation check
  handleScrollAnimation();

  // Add animation to hero image
  const heroImage = document.querySelector(".image-placeholder");
  heroImage.classList.add("float");

  // Add pulse animation to CTA buttons
  const ctaButtons = document.querySelectorAll(".btn-primary");
  ctaButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.classList.add("pulse");
    });
    btn.addEventListener("mouseleave", () => {
      btn.classList.remove("pulse");
    });
  });
});

// Active navigation link on scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").substring(1) === current) {
      item.classList.add("active");
    }
  });
});

// Download resume button functionality
document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.querySelector("a[download]");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      if (!document.querySelector("assets/resume.pdf")) {
        e.preventDefault();
        alert(
          "Resume file is being prepared. In the meantime, please contact me via email for my resume."
        );
      }
    });
  }
});

// Profile image fallback and enhancement
document.addEventListener("DOMContentLoaded", () => {
  const profileImage = document.querySelector(".profile-image");
  const profileContainer = document.querySelector(".profile-image-container");

  if (profileImage) {
    // Check if image loads successfully
    profileImage.addEventListener("error", function () {
      // If image fails to load, show fallback
      profileContainer.classList.add("no-image");
      profileImage.style.display = "none";

      // Add text fallback
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
                background: linear-gradient(135deg, var(--primary-color), #8a84ff);
            `;
      profileContainer.appendChild(fallbackText);
    });

    // Add loading animation
    profileImage.addEventListener("load", function () {
      profileImage.style.opacity = "0";
      profileImage.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        profileImage.style.opacity = "1";
      }, 100);
    });
  }

  // Add floating animation to hero image
  const heroImageContainer = document.querySelector(".hero-image");
  if (heroImageContainer) {
    heroImageContainer.classList.add("float");
  }
});

// Add to your main.js file or create a new theme.js file

// Theme Toggle Functionality
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    this.themeIcon = this.themeToggle.querySelector("i");
    this.themeText = this.themeToggle.querySelector(".theme-text");
    this.currentTheme = localStorage.getItem("theme") || "light";

    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme);

    // Add click event
    this.themeToggle.addEventListener("click", () => this.toggleTheme());

    // Listen for system theme changes
    this.watchSystemTheme();
  }

  setTheme(theme) {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);

    // Update toggle button
    if (theme === "dark") {
      this.themeIcon.className = "fas fa-sun";
      this.themeText.textContent = "Light";
    } else {
      this.themeIcon.className = "fas fa-moon";
      this.themeText.textContent = "Dark";
    }

    // Save to localStorage
    localStorage.setItem("theme", theme);

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
  }

  toggleTheme() {
    const newTheme = document.body.classList.contains("dark-theme")
      ? "light"
      : "dark";
    this.setTheme(newTheme);

    // Add animation effect
    this.animateThemeTransition();
  }

  animateThemeTransition() {
    // Add ripple effect
    const ripple = document.createElement("div");
    ripple.className = "theme-ripple";
    ripple.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 100vw;
            height: 100vh;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.1;
            z-index: 9999;
            pointer-events: none;
            animation: themeRipple 0.6s ease-out;
        `;

    document.body.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  watchSystemTheme() {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Set theme based on system preference if no localStorage preference
    if (!localStorage.getItem("theme") && prefersDark.matches) {
      this.setTheme("dark");
    }

    // Listen for system theme changes
    prefersDark.addEventListener("change", (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        this.setTheme(e.matches ? "dark" : "light");
      }
    });
  }

  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }

    // Set theme color based on current theme
    if (theme === "dark") {
      metaThemeColor.content = "#121212";
    } else {
      metaThemeColor.content = "#6c63ff";
    }
  }
}

// Add ripple animation to animations.css
const rippleAnimation = `
@keyframes themeRipple {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0.1;
    }
    50% {
        opacity: 0.05;
    }
    100% {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}

.theme-ripple {
    animation: themeRipple 0.6s ease-out;
}
`;

// Add the animation to the animations.css dynamically
if (!document.querySelector("#theme-animations")) {
  const style = document.createElement("style");
  style.id = "theme-animations";
  style.textContent = rippleAnimation;
  document.head.appendChild(style);
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme manager
  new ThemeManager();

  // Update profile image for dark theme
  const updateProfileImageForTheme = () => {
    const profileImage = document.querySelector(".profile-image");
    const isDarkTheme = document.body.classList.contains("dark-theme");

    if (profileImage) {
      // Add a subtle filter for dark theme
      if (isDarkTheme) {
        profileImage.style.filter = "brightness(0.9) contrast(1.1)";
      } else {
        profileImage.style.filter = "none";
      }
    }
  };

  // Listen for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        updateProfileImageForTheme();
      }
    });
  });

  observer.observe(document.body, { attributes: true });

  // Initial call
  updateProfileImageForTheme();

  // Rest of your existing JavaScript code...
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.querySelector("i").classList.toggle("fa-bars");
    menuToggle.querySelector("i").classList.toggle("fa-times");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.querySelector("i").classList.add("fa-bars");
      menuToggle.querySelector("i").classList.remove("fa-times");
    });
  });

  // Scroll animations
  const scrollElements = document.querySelectorAll(".scroll-animation");

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("animate");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("animate");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  // Initialize scroll animations
  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });

  // Set all elements with scroll-animation class
  document.addEventListener("DOMContentLoaded", () => {
    // Add scroll-animation class to elements
    const sections = document.querySelectorAll(".section");
    const projectCards = document.querySelectorAll(".project-card");
    const skillCategories = document.querySelectorAll(".skill-category");
    const strengthCards = document.querySelectorAll(".strength-card");

    sections.forEach((section) => section.classList.add("scroll-animation"));
    projectCards.forEach((card) => card.classList.add("scroll-animation"));
    skillCategories.forEach((category) =>
      category.classList.add("scroll-animation")
    );
    strengthCards.forEach((card) => card.classList.add("scroll-animation"));

    // Add delay classes
    document.querySelectorAll(".project-card").forEach((card, index) => {
      card.classList.add(`delay-${(index % 4) + 1}`);
    });

    // Trigger initial animation check
    handleScrollAnimation();

    // Profile image fallback and enhancement
    const profileImage = document.querySelector(".profile-image");
    const profileContainer = document.querySelector(".profile-image-container");

    if (profileImage) {
      // Check if image loads successfully
      profileImage.addEventListener("error", function () {
        // If image fails to load, show fallback
        profileContainer.classList.add("no-image");
        profileImage.style.display = "none";

        // Add text fallback
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
                    background: linear-gradient(135deg, var(--primary-color), #8a84ff);
                `;
        profileContainer.appendChild(fallbackText);
      });

      // Add loading animation
      profileImage.addEventListener("load", function () {
        profileImage.style.opacity = "0";
        profileImage.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
          profileImage.style.opacity = "1";
        }, 100);
      });
    }

    // Add floating animation to hero image
    const heroImageContainer = document.querySelector(".hero-image");
    if (heroImageContainer) {
      heroImageContainer.classList.add("float");
    }

    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll(".btn-primary");
    ctaButtons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.classList.add("pulse");
      });
      btn.addEventListener("mouseleave", () => {
        btn.classList.remove("pulse");
      });
    });
  });

  // Active navigation link on scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active");
      }
    });
  });

  // Download resume button functionality
  document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.querySelector("a[download]");

    if (downloadBtn) {
      downloadBtn.addEventListener("click", function (e) {
        if (!document.querySelector("assets/Harshi_resume[intern].pdf")) {
          e.preventDefault();
          alert(
            "Resume file is being prepared. In the meantime, please contact me via email for my resume."
          );
        }
      });
    }
  });
});
