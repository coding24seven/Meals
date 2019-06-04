/// RETURN A SHUFFLED COPY OF THE ORIGINAL ARRAY
export default function shuffleArray(array) {
  var result = [],
    source = array.concat([]);
  while (source.length) {
    let index = Math.floor(Math.random() * source.length);
    result.push(source.splice(index, 1)[0]);
  }
  return result;
}

