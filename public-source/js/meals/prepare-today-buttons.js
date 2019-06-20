export default function prepareTodayButtons(allTodayButtons, mealCookedConfirmMessage, todaysDate) {

  for (let button of allTodayButtons) {
    if (button.dataset.mealDate === todaysDate) {
      button.setAttribute("hidden", true);
    } else {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        if (!this.getAttribute("disabled")) {
          const confirmed = confirm(mealCookedConfirmMessage);
          if (confirmed) {
            const id = this.dataset.mealId;
            window.location = `/meals/${id}/${todaysDate}`;
          }
        }
      });
    }
  }
}
