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
