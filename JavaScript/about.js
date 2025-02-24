var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 3000, // Time between slide transitions (3 seconds)
    disableOnInteraction: false,
  },
  speed: 1500, // Transition duration in milliseconds (1.5 seconds for a smooth effect)
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true, // Enables infinite looping
});





// Add intersection observer for scroll animations
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
    }
});
}, {
threshold: 0.1
});

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
card.style.opacity = '0';
card.style.transform = 'translateY(20px)';
observer.observe(card);
});

// Add click event for cards
document.querySelectorAll('.card').forEach(card => {
card.addEventListener('click', () => {
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 100);
});
});





document.addEventListener("DOMContentLoaded", function () {
  // Get modal elements
  const loginOverlay = document.querySelector(".login-overlay");
  const signupOverlay = document.querySelector(".signup-overlay");

  // Buttons/links to open modals
  const openLoginBtn = document.querySelector(".login1");
  const openSignupBtn = document.querySelector(".signup1");

  // Close buttons
  const closeLoginBtn = document.querySelector(".close-login");
  const closeSignupBtn = document.querySelector(".close-signup");

  // Switch between login/signup
  const switchToLogin = document.getElementById("switchToLogin");
  const switchToSignup = document.getElementById("switchToSignup");

  // Function to open modal
  function openModal(modal) {
      if (modal) {
          modal.classList.add("active");
          document.body.style.overflow = "hidden"; // Prevent background scrolling
      }
  }

  // Function to close modal
  function closeModal(modal) {
      if (modal) {
          modal.classList.remove("active");
          document.body.style.overflow = ""; // Restore scrolling
      }
  }

  // Open login modal
  if (openLoginBtn) {
      openLoginBtn.addEventListener("click", (e) => {
          e.preventDefault();
          openModal(loginOverlay);
      });
  }

  // Open signup modal
  if (openSignupBtn) {
      openSignupBtn.addEventListener("click", (e) => {
          e.preventDefault();
          openModal(signupOverlay);
      });
  }

  // Close login modal
  if (closeLoginBtn) {
      closeLoginBtn.addEventListener("click", () => closeModal(loginOverlay));
  }

  // Close signup modal
  if (closeSignupBtn) {
      closeSignupBtn.addEventListener("click", () => closeModal(signupOverlay));
  }

  // Close modal when clicking outside
  document.addEventListener("click", (e) => {
      if (e.target.classList.contains("login-overlay")) {
          closeModal(loginOverlay);
      } else if (e.target.classList.contains("signup-overlay")) {
          closeModal(signupOverlay);
      }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
          closeModal(loginOverlay);
          closeModal(signupOverlay);
      }
  });

  // Switch to login modal from signup modal
  if (switchToLogin) {
      switchToLogin.addEventListener("click", (e) => {
          e.preventDefault();
          closeModal(signupOverlay);
          openModal(loginOverlay);
      });
  }

  // Switch to signup modal from login modal
  if (switchToSignup) {
      switchToSignup.addEventListener("click", (e) => {
          e.preventDefault();
          closeModal(loginOverlay);
          openModal(signupOverlay);
      });
  }
});