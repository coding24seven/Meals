import applyEventListeners from './eventListeners'
import updateLanguage from './updateLanguage'
import getDate from '../../shared/getDate'
import state from './state'

/// unique page identifier: page-id-index

/// WHEN PAGE IS LOADED
document.addEventListener("DOMContentLoaded", function () {
  
  // abort the function if a mismatching page has been loaded
  if (!document.getElementById('page-id-index')) return
  
  console.log('page-id-index loaded')

  //. ADD ALL EVENT LISTENERS
  applyEventListeners();

  //. SWITCH TO THE STORED FOREIGN LANGUAGE
  let language = updateLanguage();

  //. COOKED TODAY handled here
  const today = getDate();
  const links = document.getElementsByClassName("js-cooked-today");

  for (let link of links) {
    if (link.dataset.lastCookedOn === today) {
      link.setAttribute("hidden", true);
    } else {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        if (!this.getAttribute("disabled")) {
          const confirmed = confirm(state.mealCookedConfirmMessage);
          if (confirmed) {
            const id = this.dataset.mealId;
            window.location = `/meals/${id}/${today}`;
          }
        }
      });
    }
  }
});
