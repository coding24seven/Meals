import state from '../state';
import sendEditRequest from './send-edit-request';

export default function eventifyMealProperty(allMealSpecifiedProperty, type) {
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
      const confirmed = confirm("change: " + state.editedPropertyOfMeal + " to: " + e.target.innerText + " ?");
      if (confirmed) {
        sendPayload(e.target);
      } else {
        e.target.innerText = state.editedPropertyOfMeal;
      }
    }
  }

  function handleKeyDown(e) {
    console.log("KEYDOWN ON:", e.target.innerText)
    const kC = e.keyCode;
    const element = e.target;

    // F5 || enter || escape
    if (kC == 116 || kC == 13 || kC == 27) {
      e.preventDefault();
      element.blur();
    }
  }

  function sendPayload(element) {
    console.log("sendpayload running");
    const payload = {
      type, // 'name update' or 'date update' or 'count update'
      id: element.dataset.mealId, // meal id
      value: element.innerText // meal name or meal date or meal count
    }
    sendEditRequest(payload);
  } // sendPayload() ends
} 
