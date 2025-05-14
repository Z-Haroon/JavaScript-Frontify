import { activeInActiveOnClick, addBlurListener, inActiveOnScroll, inActiveOnWindowClick, searchManager, toggleOnClick } from "./functions.js";

(() => {
  // CALLING THIS FUNCTION HIDE TOP HEADER ON SCROLL
  inActiveOnScroll(".top-header__container", 50);

  // CALLING THIS FUNCTION FOR ACTIVE USER DROPDOWN MENU
  toggleOnClick(".profile-dropdown__container", ".userDropdownTarget");

  // CALLING THIS FUNCTION FOR HIDE USER DROPDOWN MENU ON WINDOW CLICK
  inActiveOnWindowClick("dropdownUserMenuCommon", ".profile-dropdown__container");

  // CALLING THESE ALL FUNCTION FOR MAKE FUNCTIONAL SIDEMENU
  activeInActiveOnClick(".side-menu__container", "#open-sideMenu__btn", true);
  activeInActiveOnClick(".side-menu__container", "#close-sideMenu__btn", false);
  toggleOnClick(".sideMenu-user__listContainer", ".sideMenu-user__container");

  fetch("./assets/API/data.json").then(response => {
    if(!response.ok) throw new Error("Products API Not working right now please check the issue and then try again.");
    return response.json();
  }).then(products => {
    searchManager(products);
  }).catch(error => console.error(error));

  // CALLING THIS FUNCTION FOR ADD BLUR LISTENER 
  addBlurListener();

})();