/*
* searches for the meals queried via an input element. it searches through all meal boxes
*/

export default function searchMeals(searchInput, allMealBoxes, cb) {
  searchInput.value = "";
  searchInput.classList.add('show');

  document.onkeydown = (e) => {
    const kC = e.keyCode;

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
      cb(); // run the layout
    }
    // focus input only if a letter or a number is pressed
    else if ((kC >= 48 && kC <= 57) || (kC >= 65 && kC <= 90) || (kC >= 96 && kC <= 105)) {
      searchInput.focus();
    } else {
      // do nothing
    }
  }

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
