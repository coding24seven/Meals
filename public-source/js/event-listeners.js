/*
* apply all site-wide listeners
*/

/// DEPENDENCIES
import throttle from 'lodash.throttle';
import updateLanguage from './lang/update-language'
import state from './state'
import elementTransform, { headerElement, screenLoader } from './elements';

/// DOMCONTENTLOADED OR VIEWPORT RESIZED: TEXT/LANGUAGE IS UPDATED
['DOMContentLoaded', 'resize'].forEach(e => {

  window.addEventListener(e, throttle(function () {
    elementTransform.setText(
      headerElement.brand,
      state.headerTextIsFull() ?
        null // long header means no modifications
        : { type: "short" } // sets the modifier for the short header
    )
  }, 1000), false);
})
/// EVENTIFY ALL CLICKABLE LANGUAGE LABELS SUCH AS COUNTRY FLAGS
const allLanguageLabels = document.querySelectorAll(".language__label");
allLanguageLabels.forEach(label => {
  label.addEventListener("click", () => {
    // give a radio button time to toggle before your function checks which one is checked now
    setTimeout(updateLanguage, 1);
  });
});

/// SCREEN LOADER
window.addEventListener('DOMContentLoaded', function () {
  screenLoader.classList.add('show');
  window.onload = function () {
    screenLoader.classList.remove('show');
  }
}, false);
