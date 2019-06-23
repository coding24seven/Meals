/*
* apply all site-wide listeners
*/

/// DEPENDENCIES
import throttle from 'lodash.throttle';
import updateLanguage from './lang/update-language'
import state from './state'
import elementTransform, { headerEl } from './elements';

/// DOMCONTENTLOADED OR VIEWPORT RESIZED: TEXT/LANGUAGE IS UPDATED

window.addEventListener('DOMContentLoaded', handleText, true); // 'true' so it fires before other 'DOMContentLoaded' events
window.addEventListener('resize', throttle(handleText, 1000), false);
function handleText() {
  elementTransform.setText(
    headerEl.brand,
    state.headerTextIsFull() ?
      null // long header means no modifications
      : { type: "short" } // sets the modifier for the short header
  )
}

/// EVENTIFY ALL CLICKABLE LANGUAGE LABELS SUCH AS COUNTRY FLAGS
const allLanguageLabels = document.querySelectorAll(".language__label");
allLanguageLabels.forEach(label => {
  label.addEventListener("click", () => {
    // give a radio button time to toggle before your function checks which one is checked now
    setTimeout(updateLanguage, 1);
  });
});

