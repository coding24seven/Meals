/*
* adds functions that will animate the 'today' button on mouseenter and mouseleave 
*/

import state from '../state';
import { indexElement } from '../elements';
import scss_vars from '../../sass/_variables.scss'

export default function eventifyTodayButtonAnimation() {
  const pointerIsFine = matchMedia('(pointer:fine)').matches;
  const buttonIsReadyToEmerge = pointerIsFine && state.getBrowserState().viewportWidth >= parseFloat(scss_vars.bp_hidden_button);

  indexElement.allMealBoxes.forEach(mealBox => {
    // when the mouse enters a meal box, the hidden button moves into view and slides down the image
    mealBox.onmouseenter = buttonIsReadyToEmerge ?
      function (e) {
        const button = e.target.querySelector(".meal-box__button");
        const image = e.target.querySelector(".meal-box__photo");
        const offset = image.clientHeight / 2 + 46;
        button.style.transform = "translateY(" + offset + "px)";
      }
      : null; // remove event listener if button permanent

    // when the mouse leaves a meal box, the button moves out of view
    mealBox.onmouseleave = buttonIsReadyToEmerge ?
      function (e) {
        const button = e.target.querySelector(".meal-box__button");
        button.style.transform = "translateY(0)";
      }
      : null; // remove event listener if button permanent
  });
}
