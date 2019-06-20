export default function eventifyMealName(allMealNames, state) {
  allMealNames.forEach(nameElement => {
    nameElement.onfocus = handleFocus;
    // nameElement.onblur = handleBlur;
    nameElement.onkeydown = handleKeyDown;
  });

  function handleFocus(e) {
    if (!state.editedNameOfMeal) state.editedNameOfMeal = e.target.innerText;
    console.log("focusing:", state.editedNameOfMeal);
  }

  function handleBlur(e) { }

  function handleKeyDown(e) {
    const kC = e.keyCode;
    const nameElement = e.target;
    const mealName = nameElement.innerText;

    // enter
    if (kC == 13) {
      e.preventDefault();
      const confirmed = confirm("change meal name?");
      if (confirmed) {
        const id = nameElement.dataset.mealId;
        window.location = `/${id}/${mealName}`;
      }
    }
    // escape
    else if (kC == 27) {
      const confirmed = confirm("Exit without saving the name?");
      if (confirmed) {
        e.target.innerText = state.editedNameOfMeal;
        state.editedNameOfMeal = "";
        nameElement.blur();
      } else {
        e.preventDefault();
      }
    }
    // F5
    else if (kC == 116) {
      const confirmed = confirm("Exit without saving the name?");
      if (!confirmed) {
        e.preventDefault();
      }
    }
  }
}
