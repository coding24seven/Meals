export default function checkDate(date) {

  // try for something like [ 03, 11, 2019 ]
  const periodArray = date.split('.');

  if (periodArray.length != 3) return false;

  // periods
  const day = periodArray[0];
  const month = periodArray[1];
  const year = periodArray[2];

  // make sure each period is a number
  periodArray.forEach(period => {
    if (isNaN(period)) return false;
  });

  // make sure each period contains an acceptable no of characters
  if ((day.length < 1 || day.length > 2)
    || (month.length < 1 || month.length > 2)
    || (year.length < 2 || year.length > 4)
  ) return false;

  // make sure periods fit in their numeric range
  if ((day < 1 || day > 31)
    || (month < 1 || month > 12)
    || (year < 2000 || year > 2099)
  ) return false;

  return true;
}
