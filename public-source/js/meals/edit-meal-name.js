import sendEditRequest from './send-edit-request';

export default function eventifyMealName(allMealNames, state) {
  allMealNames.forEach(nameElement => {
    nameElement.onfocus = handleFocus;
    nameElement.onblur = handleBlur;
    nameElement.onkeydown = handleKeyDown;
  });

  function handleFocus(e) {
    console.log("focusing in:", e.target.innerText);
    state.editedNameOfMeal = e.target.innerText;
  }

  function handleBlur(e) {
    console.log("blurring out of:", state.editedNameOfMeal)

    // if the meal has been renamed
    if (state.editedNameOfMeal != e.target.innerText) {
      const confirmed = confirm("blur: rename: " + state.editedNameOfMeal + " to: " + e.target.innerText + " ?");
      if (confirmed) {
        sendPayload(e.target);
      } else {
        e.target.innerText = state.editedNameOfMeal;
      }
    }
  }

  function handleKeyDown(e) {
    console.log("KEYDOWN ON:", e.target.innerText)
    const kC = e.keyCode;
    const nameElement = e.target;

    // F5 || enter || escape
    if (kC == 116 || kC == 13 || kC == 27) {
      e.preventDefault();
      nameElement.blur();
    }
  }

  function sendPayload(nameElement) {
    console.log("sendpayload running");
    const mealName = nameElement.innerText;
    const id = nameElement.dataset.mealId;
    const payload = {
      type: "rename",
      id,
      mealName
    }
    sendEditRequest(payload);
  }
} // sendPayload() ends
