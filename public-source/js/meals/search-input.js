/*
* searches for the meals queried via an input element. it searches through all meal boxes
*/

import state from '../state';
import { headerEl, mealsEl } from '../elements';
import createMasonryLayout from './masonry';

export function focusOrUnfocusSearchInput(keyCode) {
  const kC = keyCode;
  const searchInput = headerEl.searchInput;

  // firefox: allow tab, pgup, pgdown, home, end to do their job
  if (kC == 9 || (kC >= 33 && kC <= 36)) {
    searchInput.blur();
  }
  // escape pressed
  else if (kC == 27) {
    searchInput.blur();
    if (searchInput.value === "") return;
    searchInput.value = "";
    mealsEl.allMealBoxes.forEach(mealBox => mealBox.classList.remove('hide'));
    // trigger the 'input' event
    searchInput.dispatchEvent(new KeyboardEvent('input', { 'key': 'X' }));
  }
  // focus input if...
  else if (
    (kC == 8 || kC == 46) /* backspace or delete is pressed */
    || (kC >= 48 && kC <= 57) /* number is pressed */
    || (kC >= 65 && kC <= 90) /* letter is pressed */
    || (kC >= 96 && kC <= 105)) /* keypad num is pressed */ {
    searchInput.focus();
  }
  else {
    // nothing else matters
  }
}

// each time the search input's content changes, it will display the relevant meals and adapt the layout
export function eventifySearchInput() {

  const searchInput = headerEl.searchInput;

  searchInput.oninput = function () {

    // get search input content
    const value = this.value.toLowerCase();

    mealsEl.allMealBoxes.forEach((mealBox, i) => {

      // get the meal name from the heading whose index corresponds with its meal box
      const name = mealsEl.allNames[i].innerText.toLowerCase();

      // if the name doesn't contain the value in the search input, hide its meal box
      if (!name.includes(value)) {
        mealBox.classList.add('hide');
      } else {
        mealBox.classList.remove('hide');
      }
    })

    createMasonryLayout(state.getNoOfColsDisplayed());
  }
}
