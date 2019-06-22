/*
* returns the argument if the argument can be a number within the specified range
* returns false otherwise
*/

export default function sanitizeCount(count) {

  count = parseInt(count);

  if (!isNaN(count) && count >= 0 && count <= 99999) {
    return count;
  } else {
    return false;
  }
}
