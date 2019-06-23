import state from '../state';
import sendEditRequest from './send-edit-request';
import sanitizeString from '../../../shared/sanitize-string';
import takePropertiesOnBoard from './take-properties-on-board';

export default function eventifyEditableProperty(allMealSpecifiedProperty, type) {

  // TODO:
  // const updateType = {
  //   'name update': text => sanitizeString(text, 16, 22),
  //   'date update': state.editedPropertyOfMeal,
  //   'count update': state.editedPropertyOfMeal
  // }

  allMealSpecifiedProperty.forEach(element => {
    element.onfocus = handleFocus;
    element.onblur = handleBlur;
    element.onkeydown = handleKeyDown;
  });

  function handleFocus(e) {
    console.log("focusing in:", e.target.innerText);
    state.editedPropertyOfMeal = e.target.innerText;
  }

  function handleBlur(e) {
    console.log("blurring out of:", state.editedPropertyOfMeal)

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
    const element = e.target;

    // end, home, arrows
    if (kC >= 35 && kC <= 40) return;

    // F5 || enter || escape
    if (kC == 116 || kC == 13 || kC == 27) {
      e.preventDefault();
      element.blur();
    }
  }

  function sendPayload(element) {
    const payload = {
      type, // 'name update' or 'date update' or 'count update'
      id: element.dataset.mealId, // meal id
      value: element.innerText.trim() // meal name or meal date or meal count
    }
    // arguments: payload, success callback, failure callback
    sendEditRequest(payload,
      takePropertiesOnBoard,
      () => {
        element.innerText = state.editedPropertyOfMeal;
      });
  } // sendPayload() ends
} 
