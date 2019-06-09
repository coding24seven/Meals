export default function checkFileExtension(ext) {
  const correctExtensions = ['jpg', 'jpeg', 'png'];
  return correctExtensions.includes(ext);
}
