
/// OBTAIN DATE AND TIME IN A STRING FORMAT, FOR EXAMPLE "01/10/2076"
function getDate() {
  let d = new Date();
  let day = d.getDate() < 10 ? '0' + d.getDate().toString() : d.getDate();
  let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1).toString() : d.getMonth() + 1;
  let year = d.getFullYear();

  d = day + '.' + month + '.' + year;

  return d;
}

module.exports = getDate;
