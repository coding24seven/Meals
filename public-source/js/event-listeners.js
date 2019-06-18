import throttle from 'lodash.throttle';
import updateLanguage from './lang/update-language'
import state from './state'
import elementTransform, { headerElement } from './elements';

/// apply all site-wide listeners
function applyEventListeners() {

  //. DOMContentLoaded or viewport resized: language is updated
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
  //. all clickable language labels such as country flags
  const allLanguageLabels = document.querySelectorAll(".language__label");
  allLanguageLabels.forEach(label => {
    label.addEventListener("click", () => {
      // give a radio button time to toggle before your function checks which one is checked now
      setTimeout(updateLanguage, 1);
    });
  });
}

/// EXPORT
export default applyEventListeners
