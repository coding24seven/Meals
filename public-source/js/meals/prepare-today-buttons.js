import getDate from '../../../shared/get-date';
import state from '../state';
import { mealsEl } from '../elements';
import sendEditRequest from './send-edit-request';

export default function prepareTodayButtons() {

  const todaysDate = getDate();

  for (const button of mealsEl.allTodayButtons) {

    if (button.dataset.mealDate === todaysDate) {
      button.setAttribute("hidden", true);
    } else {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const id = this.dataset.mealId;
        if (!this.getAttribute("disabled")) {
          const confirmed = confirm(state.mealTodayConfirmMessage);
          if (confirmed) {
            const payload = {
              type: "today update",
              id,
              val: todaysDate
            }

            sendEditRequest(payload,
              // success callback
              (val, val2) => {
                // hide this 'today' button
                this.setAttribute("hidden", true);

                // update the relevant meal box with the new date and count
                for (let i = 0; i < mealsEl.allMealBoxes.length; i++) {
                  if (id == mealsEl.allDateValues[i].dataset.mealId) mealsEl.allDateValues[i].innerText = val;
                  if (id == mealsEl.allCountValues[i].dataset.mealId) mealsEl.allCountValues[i].innerText = val2;
                }
              },
              // failure callback
              () => { }
            );
          }
        }
      });
    }
  }
}
