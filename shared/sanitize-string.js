
/// SANITIZE A STRING

export default function sanitizeString(string, maxWordCount, maxWordLength) {

  // place each word in the string as an array element
  let stringAsArray = string.split(' ');

  // remove empty strings from the array
  stringAsArray = stringAsArray.filter(element => element != '');

  // shorten words exceeding maxWordLength in the array
  stringAsArray = stringAsArray.map(element =>
    element.length <= maxWordLength ?
      element
      : element.substring(0, maxWordLength)
  )

  // truncate the array to no more than maxWordCount if neccessary
  if (stringAsArray.length > maxWordCount) stringAsArray.length = maxWordCount;

  return stringAsArray.join(' ')
}
