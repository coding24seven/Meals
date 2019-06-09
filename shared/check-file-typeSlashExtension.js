export default function checkFileTypeSlashExtension(typeSlashExtension) {
  // note: 'image/jpg' would be non-standard
  const correctExtensions = ['image/jpg', 'image/jpeg', 'image/png'];
  return correctExtensions.includes(typeSlashExtension);
}
