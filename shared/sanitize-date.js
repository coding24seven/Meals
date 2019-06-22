/*
* returns a copy of the argument if the argument is a date within the specified range
* returns false otherwise
*/

export default function sanitizeDate(date) {

  // try for something like [ 23, 11, 2019 ]
  const periodArray = date.split('.');

  if (periodArray.length != 3) return false;

  // make sure each period is convertible to a number
  for (const period of periodArray) {
    if (isNaN(period)) return false;
  }

  // periods
  let day = parseInt(periodArray[0]);
  let month = parseInt(periodArray[1]);
  let year = parseInt(periodArray[2]);

  // make sure periods fit in their numeric range
  if ((day < 1 || day > 31)
    || (month < 1 || month > 12)
    || (year < 2000 || year > 2099)
  ) return false;

  // prepend each single-digit day and month with a '0'
  day = day < 10 ? '0' + day.toString() : day;
  month = month < 10 ? '0' + month.toString() : month;

  return [day, month, year].join('.');
}
