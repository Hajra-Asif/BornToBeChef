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
  