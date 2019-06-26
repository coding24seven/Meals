import { types } from '../../../shared/config';
import { errors } from '../../../shared/config';

export const languagesAvailable = ['en', 'pl'];

const text = {
  // TITLE
  title: {
    pl: "Kuchnia",
    en: "Meals"
  },

  // FULL BRAND IN THE FULL-WIDTH HEADER
  headerBrand: {
    pl: process.env.BRAND_PL || "Nasza Kuchnia",
    en: process.env.BRAND_EN || "Our Meals",
    short: {
      pl: "Kuchnia",
      en: "Meals"
    }
  },

  // SEARCH INPUT IN THE HEADER
  headerInputPlaceholder: {
    pl: "szukaj dań",
    en: "search meals"
  },

  // ADD A MEAL IN THE HEADER 
  headerAddMeal: {
    pl: "Opcje",
    en: "Settings"
  },

  // FOOTER
  footerCopyright: {
    pl: "gotująca z inspira&copy;ją od 10.10.2018",
    en: "&copy;ooking with inspiration since 10.10.2018"
  },

  // ALL COOKED TODAY BUTTONS
  allTodayButtons: {
    pl: "Dzisiaj",
    en: "Today"
  },

  // MESSAGE FOR THE MEAL COOKED CONFIRM POPUP
  mealTodayConfirmMessage: {
    pl: "Na pewno? Potwierdź:",
    en: "Are you sure you're having this meal today?"
  },

  // 'CHANGE', 'TO' IN THE 'CHANGE MEAL PROPERTY FROM X TO Y ?' CONFIRM POPUP
  mealPropertyChangeQuestionParts: {
    pl: ['zmienić: ', '\n        na: '],
    en: ['change: ', '\n        to: ']
  },

  // 'LAST COOKED ON' PHRASE
  lastCookedOnPhrase: {
    pl: "data: ",
    en: "date: "
  },

  // 'COOKED COUNT' PHRASE
  cookedCountPhrase: {
    pl: "razy: ",
    en: "count: "
  },

  // <h2> NEW MEAL ADDED MESSAGE, INITIALLY HIDDEN
  newMealAddedMessage: {
    pl: "Danie jeszcze nie dodane!",
    en: "Meal not added yet!",
    [types.mealAdded]: {
      pl: "Dodano: ",
      en: "Added: "
    }
  },

  // NEW MEAL HEADING
  newMealHeading: {
    pl: "Dodaj Nowe Danie",
    en: "Add a New Meal",
    [types.mealAdded]: {
      pl: "Dodaj następne",
      en: "Add next meal"
    }
  },
  // MEAL-NAME TEXT-INPUT'S PLACEHOLDER
  mealNameInputPlaceholder: {
    pl: "Wpisz nazwę dania",
    en: "meal name"
  },

  // MEAL-SUBMISSION PASSWORD-INPUT'S PLACEHOLDER
  passwordInputPlaceholder: {
    get passwordHint() {
      return process.env.SUBMIT_MEAL_PASSWORD_HINT ?
        "" // custom hint disabled
        : "( \"demo\" )" // hint for the demo version
    },
    get pl() { return "Wpisz hasło użytkownika " + this.passwordHint },
    get en() { return "user password " + this.passwordHint },
    [errors.wrongPassword]: {
      pl: "błędne hasło - spróbuj ponownie",
      en: "wrong password - try again"
    }
  },

  // <span> 'SELECT IMAGE' TEXT INSIDE THE NEW-MEAL BUTTON-LIKE LABEL
  pickImageText: {
    pl: "Wybierz obrazek",
    en: "Select an image",
    [errors.fileTooLarge]: {
      pl: ["Max wielkość pliku ", " kb - wybierz inny"],
      en: ["Max allowed file size is ", " kb - select again"]
    },
    [types.imageLoading]: {
      pl: ["obrazek", " się ładuje..."],
      en: ["image", " loading..."]
    },
    [errors.imagePreviewFailed]: {
      pl: ["obrazek nie da się wyświetlić", " - wybierz inny"],
      en: ["image preview failed", " - select another image"]
    },
    [errors.invalidImageExtension]: {
      pl: ["błędne rozszerzenie pliku", " - wybierz obrazek"],
      en: ["wrong file extension", " - select an image"]
    }
  },

  // <button> SUBMIT MEAL BUTTON
  submitMealButton: {
    pl: "Zatwierdź danie",
    en: "Submit the meal"
  },

  // <a> GO TO MAIN PAGE LINK
  goToMainPage: {
    pl: "&#8592; Wróć na Stronę Głowną",
    en: "&#8592; Go to Main Page"
  }
} // object ends

/// EXPORT
export default text
