import { activeInActiveOnClick, inActiveOnScroll, inActiveOnWindowClick, searchManager, toggleOnClick } from "./functions.js";

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
})();