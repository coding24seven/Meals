import sendEditRequest from './send-edit-request';

export default function prepareTodayButtons(allTodayButtons, mealTodayConfirmMessage, todaysDate) {

  for (let button of allTodayButtons) {
    if (button.dataset.mealDate === todaysDate) {
      button.setAttribute("hidden", true);
    } else {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        if (!this.getAttribute("disabled")) {
          const confirmed = confirm(mealTodayConfirmMessage);
          if (confirmed) {
            const payload = {
              type: "today update",
              id: this.dataset.mealId,
              todaysDate
            }
            sendEditRequest(payload, () => this.setAttribute("hidden", true));
          }
        }
      });
    }
  }
}
