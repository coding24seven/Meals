import throttle from 'lodash.throttle';
import createMasonryLayout from './masonry';
import eventifyTodayButtonAnimation from './eventify-today-button-animation';
import getDate from '../../../shared/get-date';
import state from '../state';
import { screenLoader, headerElement, mealsElement } from '../elements';
import { eventifySearchMealsInput, focusOrUnfocusSearchMealsInput } from './search-input';
import editMealName from './edit-meal-name';

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

  //. 'MADE TODAY' BUTTON LOGIC
  const todaysDate = getDate();

  // all 'made today' buttons
  const buttons = document.getElementsByClassName("js-had-it-today");

  for (let button of buttons) {
    if (button.dataset.mealDate === todaysDate) {
      button.setAttribute("hidden", true);
    } else {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        if (!this.getAttribute("disabled")) {
          const confirmed = confirm(state.mealCookedConfirmMessage);
          if (confirmed) {
            const id = this.dataset.mealId;
            window.location = `/meals/${id}/${todaysDate}`;
          }
        }
      });
    }
  }

  //. SEARCH INPUT
  headerElement.searchInput.value = "";
  headerElement.searchInput.classList.add('show');

  eventifySearchMealsInput(headerElement.searchInput, mealsElement.allMealBoxes,
    // callback that creates a layout
    () => {
      const noOfColumnsDisplayed = state.getNoOfColumnsDisplayed();
      createMasonryLayout(noOfColumnsDisplayed);
    })

  //. ANY KEY PRESSED ANYWHERE ON THE PAGE
  document.onkeydown = (e) => {

    // let meal names be edited without interference from the search input
    if (e.target.classList.contains('meal-box__heading')) {
      // do the editing
    }
    // delegate the event to the search input
    else {
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
