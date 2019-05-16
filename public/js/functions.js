/// OBTAIN DATE AND TIME
function formatDate(d) {
  let day = d.getDate() < 10 ? '0' + d.getDate().toString() : d.getDate();
  let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1).toString() : d.getMonth() + 1;
  let year = d.getFullYear();
  d = day + "." + month + "." + year;
  return d;
}

/// GET BROWSER FONT SIZE IN PIXELs AND VIEWPORT WIDTH IN EMs
function getBrowserState() {
  const fontSize = 1.6 * parseFloat(getComputedStyle(document.querySelector('html'))['font-size']);
  const viewportWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / fontSize;
  return {
    fontSize,
    viewportWidth
  }
}