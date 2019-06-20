/*
* searches for the meals queried via an input element. it searches through all meal boxes
*/

export function focusOrUnfocusSearchMealsInput(keyCode, searchInput, allMealBoxes) {
  const kC = keyCode;

  // firefox: allow tab, pgup, pgdown, home, end to do their job
  if (kC == 9 || (kC >= 33 && kC <= 36)) {
    searchInput.blur();
  }
  // escape pressed
  else if (kC == 27) {
    searchInput.blur();
    if (searchInput.value === "") return;
    searchInput.value = "";
    allMealBoxes.forEach(mealBox => mealBox.classList.remove('hide'));
    // trigger the 'input' event
    searchInput.dispatchEvent(new KeyboardEvent('input', { 'key': 'X' }));
  }
  // focus input if...
  else if (
    (kC == 8 || kC == 46) /* backspace or delete is pressed */
    || (kC >= 48 && kC <= 57) /* number is pressed */
    || (kC >= 65 && kC <= 90) /* letter is pressed */
    || (kC >= 96 && kC <= 105)) /* keypad is pressed */ {
    searchInput.focus();
  }
  else {
    // nothing else matters
  }
}

export function eventifySearchMealsInput(searchInput, allMealBoxes, cb) {

  searchInput.oninput = function () {
    const value = this.value.toLowerCase();

    allMealBoxes.forEach(mealBox => {

      const name = mealBox.getAttribute('name').toLowerCase();
      if (!name.includes(value)) {
        mealBox.classList.add('hide');
      } else {
        mealBox.classList.remove('hide');
      }
    })

    cb(); // run the layout
  }
}
