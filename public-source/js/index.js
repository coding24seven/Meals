import applyEventListeners from './event-listeners';
import updateLanguage from './update-language';
import getDate from '../../shared/get-date';
import state from './state';
import createMasonryLayout from './masonry';

/// unique page identifier: page-id-index

/// WHEN PAGE IS LOADED
document.addEventListener("DOMContentLoaded", function () {

  // abort the function if a mismatching page has been loaded
  if (!document.getElementById('page-id-index')) return;

  console.log('page-id-index loaded');

  //. ADD ALL EVENT LISTENERS
  applyEventListeners();

  // for creating a masonry layout
  ['load', 'resize'].forEach(e =>
    window.addEventListener(e, function () {
      // abort if only one column is being displayed
      if (state.oneColumnIsDisplayed()) return;
      createMasonryLayout();
    }, false)
  );

  //. SWITCH TO THE STORED FOREIGN LANGUAGE
  updateLanguage();

  //. COOKED TODAY handled here
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



