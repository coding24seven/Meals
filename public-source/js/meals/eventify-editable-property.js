import state from '../state';
import sendEditRequest from './send-edit-request';
import { eventifySearchInput } from './search-input';

export default function eventifyEditableProperty(allPropertyEls, type) {

  allPropertyEls.forEach(el => {
    el.onfocus = handleFocus;
    el.onblur = handleBlur;
    el.onkeydown = handleKeyDown;
  });

  function handleFocus(e) {
    console.log("focusing in:", e.target);
    state.editedPropertyOfMeal = e.target.innerText;
  }

  function handleBlur(e) {
    console.log("blurring out of:", e.target)

    // if the property of the meal has been changed
    if (state.editedPropertyOfMeal != e.target.innerText) {
      const confirmMessage = state.mealPropertyChangeQuestionParts[0]
        + state.editedPropertyOfMeal
        + state.mealPropertyChangeQuestionParts[1]
        + e.target.innerText + " ?"
      const confirmed = confirm(confirmMessage);
      if (confirmed) {
        sendPayload(e.target);
      } else {
        e.target.innerText = state.editedPropertyOfMeal;
      }
    }
  }

  function handleKeyDown(e) {

    const kC = e.keyCode;
    const el = e.target;

    // end, home, arrows
    if (kC >= 35 && kC <= 40) return;

    // F5 || enter || escape
    if (kC == 116 || kC == 13 || kC == 27) {
      e.preventDefault();
      el.blur();
    }
  }

  function sendPayload(el) {
    const payload = {
      type, // 'name update' or 'date update' or 'count update'
      id: el.dataset.mealId, // meal id
      value: el.innerText.trim() // meal name or meal date or meal count
    }

    // arguments: payload, success callback, failure callback
    sendEditRequest(payload,
      val => {
        // update the relevant meal box with the changed properties
        el.innerText = val;
        // search input is notified of changed meal properties
        eventifySearchInput;
      },
      () => {
        el.innerText = state.editedPropertyOfMeal;
      });
  } // sendPayload() ends

} // eventifyEditableProperty() ends
