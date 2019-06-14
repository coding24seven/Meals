
export default function createMasonryLayout(noOfColumnsDisplayed) {

  const container = document.querySelector(".meals-container");

  // abort if only one column is being displayed
  if (noOfColumnsDisplayed === 1) {
    container.style = "";
    return;
  }

  const items = Array.from(container.children);

  let heightOfAllItems = 0;

  items.forEach(item => {

    const height = item.clientHeight;

    let margins = 0;
    ['marginTop', 'marginBottom'].forEach(margin => margins += parseFloat(getComputedStyle(item)[margin]))

    let paddings = 0;
    ['paddingTop', 'paddingBottom'].forEach(padding => paddings += parseFloat(getComputedStyle(item)[padding]))

    let borders = 0;
    ['borderTop', 'borderBottom'].forEach(border => borders += parseFloat(getComputedStyle(item)[border]))

    heightOfAllItems += height + borders + paddings + margins;

  })

  // to make sure the last element fits without an extra column getting auto created
  const safetyNet = 50; // px

  container.style.height = Math.ceil(heightOfAllItems / noOfColumnsDisplayed) + safetyNet + "px";

}
