import throttle from 'lodash.throttle';
import createMasonryLayout from './masonry';
import eventifyTodayButtonAnimation from './eventify-today-button-animation';
import getDate from '../../../shared/get-date';
import state from '../state';
import { screenLoader, headerElement, mealsElement } from '../elements';
import todayButtons from "./prepare-today-buttons";
import { eventifySearchMealsInput, focusOrUnfocusSearchMealsInput } from './search-input';
import eventifyEditableProperty from './eventify-editable-property';

/// unique page identifier: page-id-meals

/// WHEN THE PAGE MARKUP IS LOADED
document.addEventListener("DOMContentLoaded", function () {

  // abort the function if a mismatching page has been loaded
  if (!document.getElementById('page-id-meals')) return;

  console.log('page-id-meals loaded');

  //. SCREEN LOADER
  screenLoader.classList.add('show');
  window.addEventListener('load', function () {
    screenLoader.classList.remove('show');
  }, false)

  //. SET UP 'TODAY' BUTTON ON EACH MEAL
  const todaysDate = getDate();
  todayButtons(mealsElement.allTodayButtons, state.mealTodayConfirmMessage, todaysDate);

  //. SEARCH INPUT
  headerElement.searchInput.value = "";
  headerElement.searchInput.classList.add('show');

  eventifySearchMealsInput(headerElement.searchInput, mealsElement.allMealBoxes,
    // callback that creates a layout
    () => {
      const noOfColumnsDisplayed = state.getNoOfColumnsDisplayed();
      createMasonryLayout(noOfColumnsDisplayed);
    })

  //. SET UP EVENTS FOR MEAL NAME OR DATE OR COUNT
  eventifyEditableProperty(mealsElement.allNames, 'name update');
  eventifyEditableProperty(mealsElement.allDateValues, 'date update');
  eventifyEditableProperty(mealsElement.allCountValues, 'count update');

  //. ANY KEY PRESSED FOCUSES SEARCH INPUT IF NO ELEMENT IS BEING EDITED
  document.onkeydown = (e) => {

    // let meal properties be edited without interference from the search input
    const allMealNameElements = Array.from(mealsElement.allNames);
    const allDateValuesElements = Array.from(mealsElement.allDateValues);
    const allCountValuesElements = Array.from(mealsElement.allCountValues);
    if (allMealNameElements.includes(e.target)
      || allDateValuesElements.includes(e.target)
      || allCountValuesElements.includes(e.target)) {
      // do nothing
      console.log("delegate the event to a meal property")
    }
    // delegate the event to the search input
    else {
      console.log("delegate the event to the search input")
      focusOrUnfocusSearchMealsInput(e.keyCode, headerElement.searchInput, mealsElement.allMealBoxes)
    }
  };

  //. WHEN THE PAGE IS FULLY LOADED OR RESIZED
  ['load', 'resize'].forEach(e => {

    window.addEventListener(e, throttle(function () {

      //, ADDS FUNCTIONS THAT WILL ANIMATE THE 'TODAY' BUTTON ON MOUSEENTER AND MOUSELEAVE
      eventifyTodayButtonAnimation();

      //, CREATE A MASONRY LAYOUT (IF MORE THAN ONE COLUMN IS DISPLAYED)
      const noOfColumnsDisplayed = state.getNoOfColumnsDisplayed();
      console.log("noOfColumnsDisplayed:", noOfColumnsDisplayed)
      createMasonryLayout(noOfColumnsDisplayed);
    }, 1000), false)
  });

}); // "DOMContentLoaded" ends
