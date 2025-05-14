// THIS FUNCTION FOR DEACTIVATE ELEMENTS ON WINDOW LOAD
export const inActiveOnLoad = (selector) => {
  const selectorEl = document.querySelector(selector);
  if(!selectorEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: In Active On Load.");
  return window.addEventListener("load", () => selectorEl.classList.add("active"));
};

// THIS FUNCTION FOR DEACTIVATE ELEMENTS ON SCROLL
export const inActiveOnScroll = (selector, THRESHOLD) => {
  const selectorEl = document.querySelector(selector);
  if(!selectorEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: In Active On Scroll.");
  return window.addEventListener("scroll", () => window.scrollY > THRESHOLD ? selectorEl.classList.add("active") : selectorEl.classList.remove("active"));
};

// THIS FUNCTION FOR TOGGLE ELEMENT ON CLICK
export const toggleOnClick = (selector, target) => {
  const selectorEl = document.querySelector(selector);
  const targetEl = document.querySelector(target);
  if(!selectorEl || !targetEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Toggle On Click.");
  return targetEl.addEventListener("click", () => selectorEl.classList.toggle("active"));
};

// THIS FUNCTION FOR DEACTIVE ELEMENT ON WINDOW CLICK 
export const inActiveOnWindowClick = (commonClass, selector) => {
  const selectorEl = document.querySelector(selector);
  if(!selectorEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: In Active On Window Click.");
  return window.addEventListener("click", (e) => {e.target.classList.contains(commonClass) ? false : selectorEl.classList.remove("active")});
};

// THIS FUNCTION FOR ACTIVE OR INACTIVE ELEMENTS ON CLICK
export const activeInActiveOnClick = (selector, target, isAdd) => {
  const selectorEl = document.querySelector(selector);
  const targetEl = document.querySelector(target);
  if(!selectorEl || !targetEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Active Inactive On Click.");
  targetEl.addEventListener("click", () => isAdd ? selectorEl.classList.add("active") : selectorEl.classList.remove("active"));
}

// THESE FUNCTIONS FOT MAKE SEARCH FUNCTIONAL AND FILTERING PRODUCTS ACCORDING TO USER INPUT

// THIS FUNCTION RECEIVE REQUEST FOR RENDERING RESULTS
const receiveReqForRenderResults = (id, title, shortDescription, rating, realPrice, discountedPrice, img, imageAltText, appendContainer) => {
  const resultsProductTemplateEl = document.querySelector("#search-product__template");
  if(!resultsProductTemplateEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Receive.");
  const templateEl = document.importNode(resultsProductTemplateEl.content, true);
  templateEl.querySelector(".search-product__card").setAttribute("id", id);
  templateEl.querySelector(".search-product__imgContainer img").src = img;
  templateEl.querySelector(".search-product__imgContainer img").alt = imageAltText;
  templateEl.querySelector(".search-product__title").innerText = title;
  templateEl.querySelector(".search-product__description").innerText = shortDescription;
  let ratingContainerEl = templateEl.querySelector(".rating-container");
  for(let i = 0; i < rating; i++) {
    let createIconEl = document.createElement("i");
    createIconEl.classList.add("fa-solid");
    createIconEl.classList.add("fa-star");
    ratingContainerEl.append(createIconEl);
  }
  templateEl.querySelector(".search-result__percentage").innerText = `${Math.round(((realPrice - discountedPrice) * 100) / realPrice)}% OFF`;
  templateEl.querySelector(".original-price").innerText = `Rs.${realPrice}`;
  templateEl.querySelector(".discounted-price").innerText = `Rs.${discountedPrice}`;
  appendContainer.append(templateEl);
};


// THIS FUNCTION RECEIVE USER INPUT VALUE AND FILTRATE PRODUCTS AND THEN SEND REQ FOR RENDERING
const sendReqForRenderResults = (products, userInput) => {
  const resultsContainerEl = document.querySelector(".results_container");
  const resultCounterEl = document.querySelector(".resultsFound");
  if(!resultCounterEl || !resultsContainerEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Send Req For Render Results.");
  resultsContainerEl.innerHTML = "";
  let foundProducts = products.filter(currentProduct => {
    if(currentProduct.title.toLowerCase().includes(userInput.toLowerCase())) {
      const {id, title, shortDescription, longDescription, rating, realPrice, discountedPrice, img, category, stock, imageAltText, imageTitle} = currentProduct;
      receiveReqForRenderResults(id, title, shortDescription, rating, realPrice, discountedPrice, img, imageAltText, resultsContainerEl);
      return currentProduct;
    }
  });
  if(foundProducts.length === 0) {
    resultsContainerEl.innerHTML = "Product not found."
    resultCounterEl.innerText = `[ ${foundProducts.length} ]`;
  } else {
    resultCounterEl.innerText = `[ ${foundProducts.length} ]`;
  }
};

// THIS FUNCTION FOR MANAGE ALL TYPES OF OPERATION OF SEARCH MENU
export const searchManager = (products) => {
  const searchInputEl = document.querySelector("#main-search");
  const searchResultsContainerEl = document.querySelector(".search-results__container");
  if(!searchInputEl || !searchResultsContainerEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Search Manager.");
  searchInputEl.addEventListener("input", () => {
    let filteredInput = searchInputEl.value.trim();
    if(filteredInput.length > 2) {
      searchResultsContainerEl.classList.add("active");
      sendReqForRenderResults(products, filteredInput);
    } else {
      searchResultsContainerEl.classList.remove("active");
    }
  });
};


// THESE FUNCTIONS FOR RENDER PRODUCTS WITH MAKE VIEW ALL BUTTON FUNCTIONAL

// THIS FUNCTION REVEIVE REQ AND RENDER PRODUCTS
const receiveReqForRenderProducts = (id, title, rating, realPrice, discountedPrice, img, imageAltText, appendContainer) => {
  const productTemplateEl = document.querySelector("#product-card__template");
  if(!productTemplateEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Receive Req or Render Products.");
  let productTemplate = document.importNode(productTemplateEl.content, true);
  if(title.length > 50) title = title.slice(0, 50) +"...";
  productTemplate.querySelector(".product-card").setAttribute("id", id);
  productTemplate.querySelector(".product-img__container img").src = img;
  productTemplate.querySelector(".product-img__container img").alt = imageAltText;
  productTemplate.querySelector(".product-title").innerText = title;
  let ratingContainerEl = productTemplate.querySelector(".product-rating");
  for(let i = 0; i < rating; i++) {
    let creatIconEl = document.createElement("i");
    creatIconEl.classList.add("fa-solid");
    creatIconEl.classList.add("fa-star");
    ratingContainerEl.append(creatIconEl);
  }
  productTemplate.querySelector(".product-discount__percentage").innerText = `${Math.round(((realPrice - discountedPrice) * 100) / realPrice)}% OFF`;
  productTemplate.querySelector(".product-original__price").innerText = `Rs.${realPrice}`;
  productTemplate.querySelector(".product-discounted__price").innerText = `Rs.${discountedPrice}`;
  appendContainer.append(productTemplate);

};

// THIS FUNCTION DESTRUTURE PRODUCTS FROM API AND MAKE REQ FOR RENDER PRODUCTS
const sendReqForRenderProducts = (startsWith, endsWith, renderContainer, products) => {
  let renderTheseProducts = products.slice(startsWith, endsWith);
  renderTheseProducts.forEach(currentProduct => {
    const {id, title, shortDescription, longDescription, rating, realPrice, discountedPrice, img, category, stock, imageAltText, imageTitle} = currentProduct;
    receiveReqForRenderProducts(id, title, rating, realPrice, discountedPrice, img, imageAltText, renderContainer);
  });
};

// THIS FUNCTION FOR GET CONTAINER DATA FOR MAKE A REQUEST FOR RENDER PRODUCTS
export const renderProductsManager = (products, renderContainer, btn, startsWith, endsWith) => {
  const renderContainerEl = document.querySelector(renderContainer);
  const buttonEl = document.querySelector(btn);
  let resetEnd = endsWith;
  if(!renderContainerEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Render Products Manager.");
  sendReqForRenderProducts(startsWith, endsWith, renderContainerEl, products);

  if(!btn) return;
  buttonEl.addEventListener("click", () => {
    renderContainerEl.innerHTML = ``;
    endsWith += 10;
    if(buttonEl.classList.contains("active")) {
      buttonEl.classList.remove("active");
      buttonEl.innerText = "View More";
      endsWith = resetEnd;
    }
    if(endsWith >= products.length) {
      endsWith = products.length;
      buttonEl.innerText = "View Less";
      buttonEl.classList.add("active");
    };
    sendReqForRenderProducts(startsWith, endsWith, renderContainerEl, products);
  });
};

// THIS FUNTION FOR ADD RED AND GREEN BORDER IN WRONG INPUT ENTRY
const addRedGreenBorder = (input, isRed) => {
  if(isRed) {
    input.classList.remove("greenBorder");
    input.classList.add("redBorder");
  } else {
    input.classList.remove("redBorder");
    input.classList.add("greenBorder");
  }
};

// THIS FUNCTION FOR ADD SHAKING EFFECT IN INPUT AFTER WRONG INPUT
export const addShakingEffect = (input) => {
  let position = 20;
  let count = 0;
  input.style.transition = "all 200ms ease"
  let interval = setInterval(() => {
    input.style.transform = `translateX(${position}px)`;
    position = -position;
    count++;
    if(count > 4) {
      input.style.transform = `translateX(0px)`;
      clearInterval(interval);
      count = 0;
    } 
  }, 100);
};

// THIS FUNCTION FOR SHOW ERROR MESSAGE
export const showErrorMessage = (errorMessage, messageEl) => {
  const errorMessageEl = document.querySelector(messageEl)
  if(!errorMessageEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Show Error Message.");
  errorMessageEl.style.color = "#ff4646";
  errorMessageEl.innerText = errorMessage;
  errorMessageEl.classList.add("active");
};

// THIS FUNCTION FOR ADD FOCUS LISTENER FOR GIVE GREEN BORDER TO INPUT
const addFocusListener = (input) => input.addEventListener("focus", () => addRedGreenBorder(input, false)); 

// THIS FUNCTION FOR ADD BLUR LISTENER ON EMPTY INPUTS ANF GIVE RED BORDER
export const addBlurListener = () => {
  const inputElements = document.querySelectorAll(".blur");
  if(inputElements.length === 0) return;
  inputElements.forEach(currentElement => {
    let isAdd = false;
    currentElement.addEventListener("blur", () => {
      if(currentElement.value.trim().length === 0) {
        addRedGreenBorder(currentElement, true);
        addShakingEffect(currentElement);
        if(!isAdd) {
          addFocusListener(currentElement);
          isAdd = true;
        }
      }
    });
  });
};

// THIS FUNCTION FOR HANDLE ALL TYPES OF ERRORS IN CREATING NAME
export const handleUsernameError = (input) => {
  const inputEl = document.querySelector(input);
  if(!inputEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Handle Username Error.");
  inputEl.addEventListener("input", () => {
    let value = inputEl.value.trim();
    if(value.length < 2) {
      addRedGreenBorder(inputEl, true);
      inputEl.setAttribute("data-inputCheck", false);
      inputEl.setAttribute("data-errorCode", "empty");
    } else if (/[^a-zA-Z ]/.test(value)) {
      addRedGreenBorder(inputEl, true);
      inputEl.setAttribute("data-inputCheck", false);
      inputEl.setAttribute("data-errorCode", "numberinclname");
    } else {
      addRedGreenBorder(inputEl, false);
      inputEl.setAttribute("data-inputCheck", true);
      inputEl.setAttribute("data-errorCode", "success");
    }
  });
};


// THIS FUNCTION FOR HANDLE ALL TYPES OF ERRORS IN EMAIL
export const handleUserEmailError = (input) => {
  const inputEl = document.querySelector(input);
  if(!inputEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: Handle User Email Error.");
  inputEl.addEventListener("input", () => {
    let value = inputEl.value.trim();
    if(value.length < 6) {
      addRedGreenBorder(inputEl, true);
      inputEl.setAttribute("data-inputCheck", false);
      inputEl.setAttribute("data-errorCode", "empty");
    } else if (!value.includes("@")) {
      addRedGreenBorder(inputEl, true);
      inputEl.setAttribute("data-inputCheck", false);
      inputEl.setAttribute("data-errorCode", "specialnotincl");
    } else {
      addRedGreenBorder(inputEl, false);
      inputEl.setAttribute("data-inputCheck", true);
      inputEl.setAttribute("data-errorCode", "success");
    }
  });
};

// THIS FUNCTION FOR SHOW ERRORS IN NAME
export const showErrorOnSubmit = (input, errorEl) => {
  const inputEl = document.querySelector(input);
  const errorElement = document.querySelector(errorEl);
  if(!inputEl) return console.error("Element Not Found. File: functions.js, Line: 00, Func: show Error.");
  let getErrorType = inputEl.getAttribute("data-errorCode");
  switch (getErrorType) {
    case "empty":
      showErrorMessage("Empty Input Field Not Allowed.", errorEl);
      addRedGreenBorder(inputEl, true);
      addShakingEffect(inputEl);
      return false;
    break;
    case "specialnotincl":
      showErrorMessage("Enter your valid email address example - example@organicstore.com.", errorEl);
      addRedGreenBorder(inputEl, true);
      addShakingEffect(inputEl);
      return false;
    break;
      
    case "numberinclname":
      showErrorMessage("Special Character and numbers not allowed", errorEl);
      addRedGreenBorder(inputEl, false);
      addShakingEffect(inputEl);
      return false
    break;

    case "success":
      showErrorMessage("", errorEl);
      addRedGreenBorder(inputEl, false);
      return true;
    break;
  }
};
