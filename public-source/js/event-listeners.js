import updateLanguage from './update-language'
import state from './state'
import elementTransform, { headerElement } from './elements';

/// apply all site-wide listeners
function applyEventListeners() {

  //. viewport resized
  window.addEventListener('resize', function () {

    // set the header-brand variant according to the header width
    elementTransform.setText(headerElement.brand,
      state.headerTextIsFull() ?
        null // long header means no modification
        : { type: "short" } // the header is short
    )
  });


  //. all clickable language labels such as country flags
  const allLanguageLabels = document.querySelectorAll(".language__label");
  allLanguageLabels.forEach(label => {
    label.addEventListener("click", () => {
      // give a radio button time to toggle before your function checks which one is checked now
      setTimeout(() => { updateLanguage(); }, 1);
    });
  });
}

/// EXPORT
export default applyEventListeners
