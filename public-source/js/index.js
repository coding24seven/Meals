import { indexElement } from './elements';
import applyEventListeners from './event-listeners';
import updateLanguage from './update-language';
import getDate from '../../shared/get-date';
import state from './state';
import scss_vars from '../sass/_variables.scss'
import createMasonryLayout from './masonry';

/// unique page identifier: page-id-index

/// WHEN THE PAGE MARKUP IS LOADED
document.addEventListener("DOMContentLoaded", function () {

  // abort the function if a mismatching page has been loaded
  if (!document.getElementById('page-id-index')) return;

  console.log('page-id-index loaded');

  //. SWITCH TO THE STORED FOREIGN LANGUAGE
  updateLanguage();

  //. SITE-WIDE EVENT LISTENERS
  applyEventListeners();

  //. WHEN THE PAGE IS FULLY LOADED OR RESIZED
  ['load', 'resize'].forEach(e => {

    window.addEventListener(e, function () {
      //, WHEN A MEAL BOX IS HOVERED
      const pointerIsFine = matchMedia('(pointer:fine)').matches;
      const buttonIsHidden = pointerIsFine && state.getBrowserState().viewportWidth >= parseFloat(scss_vars.bp_hidden_button);

      indexElement.allMealBoxes.forEach(mealBox => {
        // when the mouse enters a meal box, the hidden button moves into view and slides down the image
        mealBox.onmouseenter = buttonIsHidden ?
          function (e) {
            const button = e.target.querySelector(".meal-box__button");
            const image = e.target.querySelector(".meal-box__photo");
            const offset = image.clientHeight / 2 + 46;
            button.style.transform = "translateY(" + offset + "px)";
          }
          : null; // remove event listener if button permanent

        // when the mouse leaves a meal box, the button moves out of view
        mealBox.onmouseleave = buttonIsHidden ?
          function (e) {
            const button = e.target.querySelector(".meal-box__button");
            button.style.transform = "translateY(0)";
          }
          : null; // remove event listener if button permanent
      });
      //, FOR CREATING A MASONRY LAYOUT
      const noOfColumnsDisplayed = state.getNoOfColumnsDisplayed();
      console.log("noOfColumnsDisplayed:", noOfColumnsDisplayed)
      createMasonryLayout(noOfColumnsDisplayed);
    }, false)
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



