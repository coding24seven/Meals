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
            const payload = {
              type: "todays meal",
              id: this.dataset.mealId,
              todaysDate
            }
            const stringPayload = JSON.stringify(payload);
            window.location = `/meals/${stringPayload}`;
          }
        }
      });
    }
  }
}
