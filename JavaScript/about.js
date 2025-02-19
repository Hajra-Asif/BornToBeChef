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