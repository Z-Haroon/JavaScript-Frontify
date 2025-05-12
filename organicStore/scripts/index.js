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
      spaceBetween: 15,
    },
    420: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    576: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    720: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
    920: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 7,
      spaceBetween: 10,
    },
    1224: {
      slidesPerView: 7,
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 8,
      spaceBetween: 40,
    },
  }
});

// THIS FUNCTION FOR RENDER CATEGORIES
const renderCategories = (categories) => {
  const categoryTemplateEl = document.querySelector("#category-template")
  const categoriesContainerEl = document.querySelector(".category-wrapper__container");
  if(!categoriesContainerEl || !categoryTemplateEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Search Manager.");

  categories.forEach(currentCategory => {
    let categoryTemplate = document.importNode(categoryTemplateEl.content, true);
    categoryTemplate.querySelector(".category-slide").setAttribute("id", currentCategory.id);
    categoryTemplate.querySelector(".category-img").src = currentCategory.img;
    categoryTemplate.querySelector(".category-img").alt = currentCategory.title;
    categoryTemplate.querySelector(".category-name").innerText = currentCategory.title;
    categoriesContainerEl.append(categoryTemplate);
  });
};


(() => {
  // THIS FUNCTION FOR HIDE LOADING SCREEN
  inActiveOnLoad(".loading-screen");

  // CALLING THIS FUNCTION FOR RENDER CATEGORIES
  fetch("./assets/API/categories.json").then(response => {
  if(!response.ok) throw new Error("Categries API Not working right now please check the issue and then try again.");
    return response.json();
  }).then(categories => {
    renderCategories(categories);
  }).catch(error => console.error(error));
  
})();