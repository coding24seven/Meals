import state from './state'
import text from './languages'
import { setElementText } from './elements'
import { headerElement } from './elements'
import { footerElement } from './elements'
import { indexElement } from './elements'
import { newMealElement } from './elements'

export default function updateLanguage() {
  /// RETRIEVE AND STORE THE CURRENT LANGUAGE BASED ON RADIOBOXES
  let language = null; // 'pl', 'en', etc.
  let checkedRadio; // radio button that is checked
  const allInputElements = document.getElementsByTagName('input');
  //check all input elements and find one that is a radio button and is checked, if any
  for (let i = 0; i < allInputElements.length; i++) {
    if (allInputElements[i].type === 'radio' && allInputElements[i].checked) {
      checkedRadio = allInputElements[i];
      language = checkedRadio.id;
      localStorage.language = language; // 'pl', 'en', etc.
      break;
    }
  }

  // assign the default value to 'language' and 'localStorage.language' if no radio button is checked and no local storage exists
  if (!language && !localStorage.language) {
    localStorage.language = language = "en";
  }

  // assign value to 'language' from local storage if no radio button is checked
  if (!language) { language = localStorage.language; }

  /// CHANGE THE TEXT LANGUAGE

  //. TITLE
  document.title = text.title[language];

  //. MESSAGE FOR THE MEAL-COOKED-CONFIRM ALERT POPUP
  state.mealCookedConfirmMessage = text.mealCookedConfirmMessage[language];

  //. THE BRAND NAME IN THE HEADER
  // check if the element(s) exists on the currently loaded page before you place any text in it
  if (headerElement.brand) {

    // set the header-brand variant according to the header width
    setElementText(
      headerElement.brand,
      state.isHeaderTextFull() ?
        null // long header means no modifications
        : { type: "short" }, // sets the modifier for the short header
      true // prevent calling self (updateLanguage)
    )

    // this element's text will require extra modification (if modifier property present), or it will not
    const modifier = headerElement.brand.modifier

    headerElement.brand.innerHTML = modifier ?
      text.headerBrand[modifier.type][language]
      : text.headerBrand[language]
  }

  //. ADD A MEAL IN THE HEADER
  if (headerElement.addMeal) {
    headerElement.addMeal.innerHTML = text.headerAddMeal[language];
  }

  //. COPYRIGHT IN THE FOOTER
  if (footerElement.copyright) {
    footerElement.copyright.innerHTML = text.footerCopyright[language];
  }

  //. ALL COOKED TODAY BUTTONS
  if (indexElement.allCookedTodayButtons) {
    indexElement.allCookedTodayButtons.forEach(button => {
      button.innerHTML = text.allCookedTodayButtons[language];
    })
  }

  //. 'LAST COOKED ON' PHRASE
  if (indexElement.lastCookedOnPhrases) {
    indexElement.lastCookedOnPhrases.forEach(phrase => {
      phrase.innerHTML = text.lastCookedOnPhrase[language];
    })
  }

  //. 'COOKED COUNT' PHRASE
  if (indexElement.cookedCountPhrases) {
    indexElement.cookedCountPhrases.forEach(phrase => {
      phrase.innerHTML = text.cookedCountPhrase[language];
    })
  }

  //. <h2> NEW MEAL ADDED MESSAGE, INITIALLY HIDDEN
  if (newMealElement.newMealAddedMessage) {

    const { modifier } = newMealElement.newMealAddedMessage;

    newMealElement.newMealAddedMessage.innerHTML = modifier ?
      text.newMealAddedMessage[modifier.type][language]
      + modifier.mealName
      :
      text.newMealAddedMessage[language]
  }

  //. NEW MEAL HEADING
  if (newMealElement.newMealHeading) {

    const { modifier } = newMealElement.newMealHeading;

    newMealElement.newMealHeading.innerHTML = modifier ?
      text.newMealHeading[modifier.type][language]
      :
      text.newMealHeading[language];
  }

  //. MEAL NAME TEXT INPUT PLACEHOLDER
  if (newMealElement.mealNameInput) {
    newMealElement.mealNameInput.placeholder = text.mealNameInputPlaceholder[language]
  }

  //. MEAL SUBMISSION PASSWORD INPUT (PLACEHOLDER)
  if (newMealElement.passwordInput) {

    const modifier = newMealElement.passwordInput.modifier

    newMealElement.passwordInput.placeholder = modifier ?
      text.passwordInputPlaceholder[modifier.type][language]
      :
      text.passwordInputPlaceholder[language]
  }

  //. <span> 'SELECT IMAGE' TEXT INSIDE THE NEW-MEAL BUTTON-LIKE LABEL
  if (newMealElement.pickImageText) {

    const modifier = newMealElement.pickImageText.modifier

    newMealElement.pickImageText.innerHTML = modifier ?
      text.pickImageText[modifier.type][language][0]
      + modifier.midMessage // optional message from modifier to insert in the middle
      + text.pickImageText[modifier.type][language][1]
      :
      text.pickImageText[language];
  }
  //. <button> SUBMIT MEAL BUTTON
  if (newMealElement.submitMealButton) {
    newMealElement.submitMealButton.innerHTML = text.submitMealButton[language];
  }

  //. <a> GO TO MAIN PAGE LINK
  if (newMealElement.goToMainPage) {
    newMealElement.goToMainPage.innerHTML = text.goToMainPage[language];
  }

  ///
  return language;
}
