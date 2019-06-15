
export default function createMasonryLayout(noOfColumnsDisplayed) {

  const container = document.querySelector(".meals-container");
  const items = Array.from(container.children);

  // reset masonry-critical 'container height' if only one column is being displayed
  if (noOfColumnsDisplayed === 1 || items.length === 1) {
    container.style.height = "";
  }
  // build the masonry layout since at least two columns are being displayed
  else {

    let heightOfAllItems = 0;

    items.forEach(item => {

      const height = item.clientHeight;

      let margins = 0;
      ['marginTop', 'marginBottom'].forEach(margin => margins += parseFloat(getComputedStyle(item)[margin]))

      let paddings = 0;
      ['paddingTop', 'paddingBottom'].forEach(padding => paddings += parseFloat(getComputedStyle(item)[padding]))

      let borders = 0;
      ['borderTop', 'borderBottom'].forEach(border => borders += parseFloat(getComputedStyle(item)[border]) || 1) // '1' because glitchy firefox Returns no value for 'borderTop'

      heightOfAllItems += height + borders + paddings + margins;
    })

    // make sure the container height is enough for all elements to fit in without an extra column getting auto created
    let mHsK = 0; // a.k.a. 'merciless horizontal-scrollbar killer' in px
    do {
      container.style.height = Math.ceil(heightOfAllItems / noOfColumnsDisplayed) + mHsK + "px";
      mHsK += 40;
    } while (detectHorizontalScrollbar());
  }

  // make the container visible regardless of the applied layout
  container.style.visibility = "visible"; // 'hidden' in css

  function detectHorizontalScrollbar() {
    const root = document.compatMode === 'BackCompat' ?
      document.body : document.documentElement;
    return root.scrollWidth > root.clientWidth;
  }
}
