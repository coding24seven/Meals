import elementTransform, { newMealElement } from '../elements';
import updateDomOn from './update-dom-on';
import checkFileTypeSlashExtension from '../../../shared/check-file-type-slash-extension';
import dataURLtoFile from './data-url-to-file';
import reduceImageResolution from './reduce-image-resolution';
import convertToJpg from './convert-to-jpg';
import conformToMaxImgSize from './conform-to-max-img-size';
import rotateImage from './rotate-image';
import { uploadableImage } from '../state';
import config from '../../../shared/config'; // use variables from the shared config file

/// FILE UPLOAD HANDLER - TRIGGERED BY THE FILE PICKER INPUT'S 'CHANGE' EVENT
export default function handleFilePicked(event) {

  // retrieve the user-picked file
  const pickedFile = event.target.files[0];

  //. file has just been selected in the file picker
  if (pickedFile) {

    const reader = new FileReader();
    reader.readAsDataURL(pickedFile);
    reader.onload = handleOnload(pickedFile);

    function handleOnload(theFile) {
      return function (readerEvent) {
        // if the file has a type/extension that does not match image/jpg, etc.
        if (!checkFileTypeSlashExtension(pickedFile.type)) {
          updateDomOn.unacceptableFile("invalid image extension", "");
          return;
        }

        // array contains a shared argument followed by callbacks
        const cbRunner = [
          /*0*/ uploadableImage,
          // function arguments: this array, callback index
          /*1*/ function () { initiate(this, 2) }, // defined below in this module
          /*2*/ function () { reduceImageResolution(this, 3, 7) }, // this, onload, onerror
          /*3*/ function () { convertToJpg(this, 4) },
          /*4*/ function () { conformToMaxImgSize(this, 5) },
          /*5*/ function () { changeFileExtToLowercaseJpg(this, 6) }, // in this module
          /*6*/ function () { showImgPreview(this, 7) }, // in this module
          /*7*/ function () { checkImgPreview(this, 8) }, // in this module
          /*8*/ function () { rotateImage(this, 6) }
        ];
        // start the chain of callbacks
        cbRunner[1](); // cbRunner[5]() to skip image processing

        function initiate(cbRunner, cbIndex) {
          // set the 'file loading...' message. disable the file-picking label.
          updateDomOn.fileLoading();

          // give DOM time to render before heavy processing kicks in
          setTimeout(() => {
            // 'uploadableImage' is a state object that stores the image data used for upload
            uploadableImage.name = theFile.name
            uploadableImage.type = theFile.type; // such as 'image/jpeg', 'image/png'
            uploadableImage.width = null; // populated with Image object
            uploadableImage.height = null; // populated with Image object
            uploadableImage.maxRes = 640; // max allowed output image width or height in px
            uploadableImage.maxSize = config.maxUploadFileSize; // max allowed output image size in bytes
            uploadableImage.jpgQuality = 0.9; // reduce jpg quality to this if jpg size is over maxSize
            uploadableImage.rotationCounter = 0;
            uploadableImage.isReadyForUpload = false; // if image is valid and ready for upload
            // (in kb) initialize 'sizeOfOutputFile' from the user-picked file
            uploadableImage.sizeOfOutputFile = dataURLtoFile(readerEvent.target.result, theFile.name).size;
            // point to the file in dateURL format
            uploadableImage.originalContentAsDataURL = readerEvent.target.result;
            uploadableImage._contentAsDataURL = readerEvent.target.result;
            uploadableImage.getContentAsDataURL = function () { return this._contentAsDataURL; };
            uploadableImage.setContentAsDataURL = function (dataURLContent) {
              this._contentAsDataURL = dataURLContent;
              this.sizeOfOutputFile = dataURLtoFile(dataURLContent, this.name).size;
            }

            cbRunner[cbIndex](); // call the first image-processing function
          }, 50);
        }

        // replaces the file extension with 'jpg'
        function changeFileExtToLowercaseJpg(cbRunner, cbIndex) {
          const uploadableImage = cbRunner[0];
          let arr = uploadableImage.name.split('.')
          arr[arr.length - 1] = 'jpg';
          uploadableImage.name = arr.join('.');
          cbRunner[cbIndex]();
        }

        // show the image preview
        function showImgPreview(cbRunner, cbIndex) {
          const uploadableImage = cbRunner[0];

          newMealElement.imagePreview.innerHTML = [
            '<img src="',
            uploadableImage.getContentAsDataURL(),
            '" title="',
            uploadableImage.name,
            '" width="100%" />',
            '<span>&cudarrr;</span>'
          ].join('');
          elementTransform.show(newMealElement.imagePreview);
          // allow the imagePreview to update first before you check its height
          setTimeout(() => cbRunner[cbIndex](), 1);
        }

        // makes sure the image preview has displayed correctly
        function checkImgPreview(cbRunner, cbIndex) {
          // const uploadableImage = cbRunner[0];

          // the image preview must have at least minHeight
          const minHeight = 100 // px
          if (newMealElement.imagePreview.clientHeight >= minHeight) {
            updateDomOn.acceptableFile();
            // rotate the image on click
            newMealElement.imagePreview.onclick = function () {
              cbRunner[cbIndex]();
            }
          }
          // the image is too small or does not display correctly
          else {
            const clientError = "image preview failed";
            updateDomOn.unacceptableFile(clientError, "");
          };
        }
      };
    }
  }

  //. no file has just been selected in the file picker (via cancel button or escape)
  else { return; }
}
