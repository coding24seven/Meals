import elementTransform, { newMealElement } from '../elements';
import actOn from './act-on';
import checkFileTypeSlashExtension from '../../../shared/check-file-typeSlashExtension';
import dataURLtoFile from '../../../shared/data-url-to-file';
import reduceImageResolution from './reduce-image-resolution';
import convertToJpg from './convert-png-to-jpg';
import state from '../state';

/// FILE UPLOAD HANDLER - TRIGGERED BY THE FILE PICKER INPUT'S 'CHANGE' EVENT
export default function handleFilePicked(event) {

  // maintenance: remove the "added: example meal" message from view
  elementTransform.show(newMealElement.newMealAddedMessage, false);

  // retrieve the user-picked file
  const pickedFile = event.target.files[0];

  //. file has just been selected in the file picker
  if (pickedFile) {

    state.uploadableImage = null; // TODO: 

    const reader = new FileReader();
    reader.readAsDataURL(pickedFile);
    reader.onload = handleOnload(pickedFile);

    function handleOnload(theFile) {
      return function (readerEvent) {
        // if the file has a type/extension that does not match image/jpg, etc.
        if (!checkFileTypeSlashExtension(pickedFile.type)) {
          actOn.unacceptableFile("invalid image extension", "");
          return;
        }

        // this object stores the image data used for upload
        state.uploadableImage = {
          name: theFile.name,
          type: theFile.type,
          width: null,
          height: null,
          maxRes: 640, // max allowed output image width or height in px
          maxSize: 100000, // max allowed output image size in bytes
          jpgQuality: 0.9, // reduce jpg quality to this if image size over maxSize
          sizeOfOutputFile: dataURLtoFile(readerEvent.target.result, theFile.name).size, // in kb
          // point to the file in dateURL format
          _contentAsDataURL: readerEvent.target.result,
          getContentAsDataURL: function () { return this._contentAsDataURL; },
          setContentAsDataURL: function (dataURLContent) {
            this._contentAsDataURL = dataURLContent;
            this.sizeOfOutputFile = dataURLtoFile(dataURLContent, this.name).size;
          }
        }

        // warning: async 'Image.onload' inside if...else
        if (state.uploadableImage.type !== "image/jpeg") {
          // conversion to jpg with a callback on finish
          convertToJpg(state.uploadableImage, reduceImageResolution);
        } else {
          reduceImageResolution(state.uploadableImage);
        }

        // show the image preview (of the unmodified user-picked image )
        newMealElement.imagePreview.innerHTML = ['<img src="',
          state.uploadableImage.getContentAsDataURL(),
          '" title="',
          state.uploadableImage.name,
          '" width="100%" />'].join('');
        elementTransform.show(newMealElement.imagePreview);


        // allow the imagePreview to update first before you check its height
        setTimeout(() => {
          // the image preview must have minHeight
          const minHeight = 100 // px
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
    }
  }

  //. no file has just been selected in the file picker (via cancel button or escape)
  else { return; }
}
