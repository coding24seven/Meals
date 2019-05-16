function switchLanguage() {
  /// RETRIEVE AND STORE THE CURRENT LANGUAGE BASED ON RADIOBOXES
  let language = null; // 'pl', 'gb', etc.
  let checkedRadio; // radio button that is checked
  const allInputElements = document.getElementsByTagName('input');
  //check all input elements and find one that is a radio button and is checked, if any
  for (let i = 0; i < allInputElements.length; i++) {
    if (allInputElements[i].type === 'radio' && allInputElements[i].checked) {
      checkedRadio = allInputElements[i];
      language = checkedRadio.id;
      localStorage.language = language; // 'pl', 'gb', etc.
      break;
    }
  }

  // assign default value to 'language' and 'localStorage.language' if no radio button is checked and no local storage exists
  if (!language && !localStorage.language) {
    localStorage.language = language = "pl";
  }

  // assign value to 'language' from local storage if no radio button is checked
  if (!language) { language = localStorage.language; }

  /// CHANGE THE TEXT LANGUAGE
  let text;

  // TITLE
  switch (language) {
    case "pl": text = "Kuchnia"; break;
    case "gb": text = "Mum's Meals"; break;
  }
  document.title = text;

  // HEADER BRAND
  switch (language) {
    case "pl": text = state.fullHeaderText ? "Kuchnia Pani Bożeny" : "Kuchnia"; break;
    case "gb": text = state.fullHeaderText ? "Meals from Ms Bozena" : "Meals"; break;
  }
  elements.brand.innerHTML = text;

  // HEADER ADD A MEAL
  switch (language) {
    case "pl": text = "Dodaj Danie"; break;
    case "gb": text = "Add a Meal"; break;
  }
  elements.addMeal.innerHTML = text;

  // FOOTER
  switch (language) {
    case "pl": text = "gotująca z inspira&copy;ją od 10.10.2018"; break;
    case "gb": text = "&copy;ooking with inspiration since 10.10.2018"; break;
  }
  elements.footerCopyright.innerHTML = text;

  // ALL COOKED TODAY BUTTONS
  switch (language) {
    case "pl": text = "Zrobiłam Dziś"; break;
    case "gb": text = "Made today"; break;
  }
  elements.allCookedTodayButtons.forEach(button => {
    button.innerHTML = text;
  })

  // MESSAGE FOR THE MEAL COOKED CONFIRM POPUP
  switch (language) {
    case "pl": text = "Na pewno ugotowałaś? Potwierdź:"; break;
    case "gb": text = "Are you sure you made this meal today?"; break;
  }
  state.mealCookedConfirmMessage = text;

  // 'LAST COOKED ON' PHRASE
  switch (language) {
    case "pl": text = "ostatnio gotowane: "; break;
    case "gb": text = "last cooked on: "; break;
  }
  elements.lastCookedOnPhrases.forEach(phrase => {
    phrase.innerHTML = text;
  })

  // 'COOKED COUNT' PHRASE
  switch (language) {
    case "pl": text = "gotowane razy: "; break;
    case "gb": text = "cooked count: "; break;
  }
  elements.cookedCountPhrases.forEach(phrase => {
    phrase.innerHTML = text;
  })

  // NEW MEAL HEADING
  switch (language) {
    case "pl": text = "Nowe Danie"; break;
    case "gb": text = "New Meal"; break;
  }
  if (elements.newMealHeading) elements.newMealHeading.innerHTML = text;

  // MEAL NAME TEXT INPUT PLACEHOLDER
  switch (language) {
    case "pl": text = "Wpisz nazwę dania"; break;
    case "gb": text = "meal name"; break;
  }
  if (elements.mealNameInput) elements.mealNameInput.placeholder = text;

  // <span> CHOOSE PICTURE FOR THE NEW MEAL BUTTON
  switch (language) {
    case "pl": text = "Wybierz obrazek"; break;
    case "gb": text = "Choose a picture"; break;
  }
  if (elements.choosePictureButton) elements.choosePictureButton.innerHTML = text;

  // <button> SUBMIT MEAL BUTTON
  switch (language) {
    case "pl": text = "Zatwierdź danie"; break;
    case "gb": text = "Submit the meal"; break;
  }
  if (elements.submitMealButton) elements.submitMealButton.innerHTML = text;

  // <a> GO TO MAIN PAGE LINK
  switch (language) {
    case "pl": text = "&#8592; Wróć na Stronę Głowną"; break;
    case "gb": text = "&#8592; Go to Main Page"; break;
  }
  if (elements.goToMainPage) elements.goToMainPage.innerHTML = text;

  return language;
}
