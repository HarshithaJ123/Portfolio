// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Add active class to nav links on click
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    // Remove active class from all links
    document.querySelectorAll(".nav-links a").forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to clicked link
    this.classList.add("active");
  });
});
