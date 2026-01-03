// Theme Toggle Functionality
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    if (!this.themeToggle) return;

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

    // Update profile image for theme
    this.updateProfileImageForTheme();
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

  updateProfileImageForTheme() {
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
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});
