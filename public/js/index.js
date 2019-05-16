/// WHEN PAGE IS LOADED
document.addEventListener("DOMContentLoaded", function () {

  //. ADD ALL EVENT LISTENERS
  applyEventListeners();

  //. SWITCH TO THE STORED FOREIGN LANGUAGE
  let language = switchLanguage();

  //. COOKED TODAY handled here
  const today = formatDate(new Date());
  const links = document.getElementsByClassName("js-cooked-today");

  for (let link of links) {
    if (link.dataset.lastCookedOn === today) {
      link.setAttribute("hidden", true);
    } else {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        if (!this.getAttribute("disabled")) {
          const confirmed = confirm(state.mealCookedConfirmMessage);
          if (confirmed) {
            const id = this.dataset.mealId;
            window.location = `/meals/${id}/${today}`;
          }
        }
      });
    }
  }
});
