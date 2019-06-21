/*
* returns true if the argument is a number between 0 - 999
*/

export default function checkCount(count) {
  return (!isNaN(count) && count >= 0 && count <= 999)
}
