
/// SANITIZE A STRING

function sanitizeString(string, maxWordCount, maxWordLength) {

  // place each word in the string as an array element
  let stringAsArray = string.split(' ');

  // truncate the array to no more than maxWordCount
  stringAsArray.length = maxWordCount;

  // remove empty strings from the array
  stringAsArray = stringAsArray.filter(element => element != '');

  // shorten words exceeding maxWordLength in the array
  stringAsArray = stringAsArray.map(element =>
    element.length < maxWordLength ?
      element
      : element.substring(0, maxWordLength - 3) + "..."
  )

  return stringAsArray.join(' ')
}

export default sanitizeString;
