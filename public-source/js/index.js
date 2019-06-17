import applyEventListeners from './event-listeners';
import getDate from '../../shared/get-date';
import state from './state';
import createMasonryLayout from './masonry';
import eventifyTodayButtonAnimation from './eventify-today-button-animation';
import throttle from 'lodash.throttle';

/// unique page identifier: page-id-index

/// WHEN THE PAGE MARKUP IS LOADED
document.addEventListener("DOMContentLoaded", function () {

  // abort the function if a mismatching page has been loaded
  if (!document.getElementById('page-id-index')) return;

  console.log('page-id-index loaded');

  //. SITE-WIDE EVENT LISTENERS
  applyEventListeners();

  //. WHEN THE PAGE IS FULLY LOADED OR RESIZED
  ['load', 'resize'].forEach(e => {

    window.addEventListener(e, throttle(function () {

      //, ADDS FUNCTIONS THAT WILL ANIMATE THE 'TODAY' BUTTON ON MOUSEENTER AND MOUSELEAVE
      eventifyTodayButtonAnimation();

      //, CREATE A MASONRY LAYOUT IF MORE THAN ONE COLUMN IS DISPLAYED
      const noOfColumnsDisplayed = state.getNoOfColumnsDisplayed();
      console.log("noOfColumnsDisplayed:", noOfColumnsDisplayed)
      createMasonryLayout(noOfColumnsDisplayed);
    }, 1000), false)
  });

  //. 'MADE TODAY' BUTTON LOGIC
  const todaysDate = getDate();

  // all 'made today' buttons
  const buttons = document.getElementsByClassName("js-made-today");

  for (let button of buttons) {
    if (button.dataset.lastMadeOn === todaysDate) {
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
});



