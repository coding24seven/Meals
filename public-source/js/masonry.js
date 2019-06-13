
export default function createMasonryLayout() {

  const grid = document.querySelector(".meals-container");
  const items = document.querySelectorAll(".meal-box");
  const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const rowGapHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-row-gap'));

  items.forEach(item => {

    grid.style.alignItems = "start"; // so items do not stretch vertically

    // the number of rows for each particular item to span
    const noOfRowsToSpan = Math.ceil((item.clientHeight + rowGapHeight) / (rowHeight + rowGapHeight)) + 1;

    item.style.gridRowEnd = "span " + noOfRowsToSpan;

  })

  grid.removeAttribute("style"); // so all column gaps are the same size
}
