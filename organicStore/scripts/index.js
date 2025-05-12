import { inActiveOnLoad } from "./functions.js";

// THIS IS CATEGORY SECTION SLIDER PROPERTIES
let swiper = new Swiper(".category-mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true, // ✅ Infinite loop enabled
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".category-right__swipeBtn",
    prevEl: ".category-left__swipeBtn",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    300: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    400: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 5,
      spaceBetween: 10,
    },    
    768: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
    1440: {
      slidesPerView: 8,
      spaceBetween: 40,
    }
  }
});


(() => {
  // THIS FUNCTION FOR HIDE LOADING SCREEN
  inActiveOnLoad(".loading-screen");
})();