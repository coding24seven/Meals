import updateLanguage from "./updateLanguage";

/// HEADER ELEMENTS
export const headerElement = {
  // CLICKABLE BRAND IN THE HEADER
  brand: document.querySelector(".navbar-top__brand"),

  // ADD-MEAL LINK IN THE HEADER
  addMeal: document.querySelector(".navbar-top__add-meal")
}

/// FOOTER ELEMENTS
export const footerElement = {
  // COPYRIGHT IN THE FOOTER
  copyright: document.querySelector(".footer-copyright")
}

/// INDEX PAGE ELEMENTS
export const indexElement = {
  // ALL 'MEAL MADE TODAY' BUTTONS
  allCookedTodayButtons: document.querySelectorAll(".meal-box__button"),

  // ALL 'LAST COOKED ON' PHRASES
  lastCookedOnPhrases: document.querySelectorAll(".last-cooked-on-phrase"),

  // ALL 'COOKED COUNT' PHRASES
  cookedCountPhrases: document.querySelectorAll(".cooked-count-phrase")
}

/// NEW-MEAL PAGE ELEMENTS
export const newMealElement = {

  // <h2> NEW MEAL ADDED MESSAGE, INITIALLY HIDDEN
  newMealAddedMessage: document.querySelector(".new-meal-added-message"),

  // <h1> NEW MEAL HEADING
  newMealHeading: document.querySelector(".new-meal-heading"),

  // <form> NEW MEAL FORM
  newMealForm: document.querySelector(".new-meal-form"),

  // <input> MEAL NAME TEXT INPUT
  mealNameInput: document.querySelector(".new-meal-form__meal-name"),

  // <input> MEAL SUBMISSION PASSWORD INPUT
  passwordInput: document.querySelector(".new-meal-form__password"),
  //
  //
  // <label> BUTTON-LIKE LABEL THAT CONTAINS 'SELECT IMAGE' TEXT AND FILE INPUT ELEMENT
  pickImageLabel: document.querySelector(".new-meal-form__label"),

  // <span> TEXT SUCH AS 'SELECT IMAGE' INSIDE pickImageLabel
  pickImageText: document.querySelector(".new-meal-form__pick-image-text"),

  // <input> FILE UPLOAD
  fileUploadInput: document.querySelector("#file-upload"),

  // <output> DISPLAYS THE MEAL IMAGE READY TO BE UPLOADED
  imagePreview: document.querySelector("#image-preview"),
  //
  //
  // <div> BOX FOR THE SUBMIT BUTTON AND UPLOAD PROGRESS BAR
  uploadBox: document.querySelector(".new-meal-form__upload-box"),

  // <span> SUBMIT PICTURE FOR THE NEW MEAL BUTTON
  submitMealButton: document.querySelector(".new-meal-form__submit"),

  // <div> PROGRESS BAR THAT OVERLAPS THE SUBMIT BUTTON
  uploadProgressBar: document.querySelector(".new-meal-form__upload-progress-bar"),

  // <div> PROGRESS BAR FILL
  uploadProgressBarFill: document.querySelector(".new-meal-form__upload-progress-bar-fill"),
  //
  //
  // <a> GO TO MAIN PAGE LINK
  goToMainPage: document.querySelector(".go-to-main-page")
}

/// A SET OF FUNCTIONS
const elementTransform = {

  //. SET MODIFIED/UNMODIFIED TEXT IN AN ELEMENT
  setText: function (element, modifier, preventUpdateLanguage) {
    // a modifer such as {type: x, message: y} sets the corresponding text
    // falsy modifier, such as null, restores the original text
    element.modifier = modifier

    // preventUpdateLanguage is called by default
    // do not call updateLanguage if preventUpdateLanguage is truthy
    !preventUpdateLanguage && updateLanguage()
  },

  //. ENABLE/DISABLE AN ELEMENT VIA CSS
  enable: function (element, enable = true) {
    if (enable) {
      element.classList.add('js-enable');
      element.classList.remove('js-disable');
    } else {
      element.classList.add('js-disable');
      element.classList.remove('js-enable');
    }
  },

  //. SHOW/HIDE AN ELEMENT VIA CSS
  show: function (element, show = true) {
    // either "js-show" or "js-hide" is used for each element in css, depending on the element's initial visibility
    if (show) {
      element.classList.add("js-show");
      element.classList.remove("js-hide");
    } else {
      element.classList.remove("js-show");
      element.classList.add("js-hide");
    };
  }
}
export default elementTransform;
/// A SET OF FUNCTIONS ENDS 
