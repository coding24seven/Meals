function Elements() {
  // MEALS PAGE HEADER
  this.brand = document.querySelector(".navbar-top__brand");
  this.addMeal = document.querySelector(".navbar-top__add-meal");
  // MEALS PAGE FOOTER
  this.footerCopyright = document.querySelector(".footer-copyright");

  // ALL MEAL MADE TODAY BUTTONS
  this.allCookedTodayButtons = document.querySelectorAll(".meal-box__button");

  // ALL 'LAST COOKED ON' PHRASES
  this.lastCookedOnPhrases = document.querySelectorAll(".last-cooked-on-phrase");

  // ALL 'COOKED COUNT' PHRASES
  this.cookedCountPhrases = document.querySelectorAll(".cooked-count-phrase");

  // NEW MEAL HEADING
  this.newMealHeading = document.querySelector(".new-meal-heading");

  // MEAL NAME TEXT INPUT
  this.mealNameInput = document.querySelector(".new-meal-form__meal-name");

  // <span> CHOOSE PICTURE FOR THE NEW MEAL BUTTON
  this.choosePictureButton = document.querySelector(".new-meal-form__choose-picture");

  // <span> SUBMIT PICTURE FOR THE NEW MEAL BUTTON
  this.submitMealButton = document.querySelector(".new-meal-form__submit");

  // <a> GO TO MAIN PAGE LINK
  this.goToMainPage = document.querySelector(".go-to-main-page");
}

const elements = new Elements();