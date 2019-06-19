/*
* searches for the meals queried via an input element. it searches through all meal boxes
*/

export default function searchMeals(searchInput, allMealBoxes, cb) {
  searchInput.classList.add('show');
  document.onkeydown = () => searchInput.focus();

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
    cb();
  }
}
