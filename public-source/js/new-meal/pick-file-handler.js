import elementTransform, { newMealElement } from '../elements';
import actOn from './act-on';

/// FILE UPLOAD HANDLER - TRIGGERED BY THE FILE PICKER INPUT'S 'CHANGE' EVENT
export default function handleFilePicked(event) {

  // maintenance: remove the "added: example meal" message from view
  newMealElement.newMealAddedMessage.style.display = "none"

  // retrieve the user-picked file
  const pickedFile = event.target.files[0];

  //. file has just been selected in the file picker
  if (pickedFile) {

    const reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        elementTransform.show(newMealElement.imagePreview);
        newMealElement.imagePreview.innerHTML = ['<img src="', e.target.result, '" title="', theFile.name, '" width="100%" />'].join('');

        // allow the DOM element above to update first
        setTimeout(() => {
          // the image preview must have minHeight
          const minHeight = 60 // px
          if (newMealElement.imagePreview.clientHeight > minHeight) {
            actOn.acceptableFile();
          }
          // the image is too small or does not display correctly
          else {
            const clientError = "image preview failed";
            actOn.unacceptableFile(clientError, "");
          };

        }, 1); // setTimeout ends
      };
    })(pickedFile);

    // read the file
    reader.readAsDataURL(pickedFile);
  }

  //. no file has just been selected in the file picker (via cancel button or escape)
  else { return; }
}
