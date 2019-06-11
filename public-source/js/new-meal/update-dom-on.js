/*
* sets state
* sets appropriate user messages
*/

import state from '../state';
import elementTransform, { newMealElement } from '../elements';

const updateDomOn = {
  /// WHEN THE SUPPLIED PASSWORD IS WRONG
  wrongPassword: function (error) {
    // display a styled error message as the password input's placeholder
    newMealElement.passwordInput.value = '' // clear the password input
    newMealElement.passwordInput.classList.add('js-error')
    // give the element a modifier so the language function can incorporate it
    elementTransform.setText(newMealElement.passwordInput, {
      type: error,
      message: null
    })
  },

  /// USER-PICKED FILE BEGINS TO LOAD...
  fileLoading: function () {

    // maintenance: remove the "added: example meal" message from view
    elementTransform.show(newMealElement.newMealAddedMessage, false);

    // style the 'image loading' message inside the file-picker's label
    newMealElement.pickImageLabel.classList.add('js-progress');
    newMealElement.pickImageText.classList.add('js-progress');

    // display 'image loading...' message on the file-picking label
    elementTransform.setText(newMealElement.pickImageText, {
      type: "image loading", midMessage: ""
    });
  },

  /// WHEN THE USER-PICKED FILE TURNS OUT TO BE A VALID IMAGE FOR UPLOAD
  acceptableFile: function () {
    state.uploadableImage.isReadyForUpload = true;

    // show the image preview and submit button
    elementTransform.show(newMealElement.uploadBox, state.uploadableImage.isReadyForUpload)
    elementTransform.show(newMealElement.imagePreview, state.uploadableImage.isReadyForUpload)

    newMealElement.pickImageLabel.classList.remove('js-progress');
    newMealElement.pickImageText.classList.remove('js-progress');

    // restore the original text on the file-picking label
    elementTransform.setText(newMealElement.pickImageText, null);
  },

  /// WHEN THE USER-PICKED FILE TURNS OUT TO BE TOO LARGE, HAS A WRONG EXTENSION, ETC.
  unacceptableFile: function (error, midMessage) {
    // reset uploadableImage.isReadyForUpload state - applies to future upload attempts
    state.uploadableImage.isReadyForUpload = false;

    // style the error message inside the file-picker's label
    newMealElement.pickImageLabel.classList.remove('js-progress');
    newMealElement.pickImageText.classList.remove('js-progress');
    newMealElement.pickImageLabel.classList.add('js-error');

    // show error message by giving the element a modifier so the language function can incorporate it
    elementTransform.setText(newMealElement.pickImageText, {
      type: error,
      midMessage
    });

    // hide the preview and submit button 
    elementTransform.show(newMealElement.imagePreview, state.uploadableImage.isReadyForUpload);
    elementTransform.show(newMealElement.uploadBox, state.uploadableImage.isReadyForUpload);
  },

  /// DO THIS WHEN THE FILE STARTS UPLOADING
  fileStartsUploading: function () {
    elementTransform.enable(newMealElement.pickImageLabel, false);
    elementTransform.show(newMealElement.uploadProgressBar, true);
  },

  /// DO THIS WHEN THE FILE ENDS UPLOADING
  fileEndsUploading: function () {
    elementTransform.enable(newMealElement.pickImageLabel, true);
    newMealElement.uploadProgressBarFill.classList.add('js-retract');
    newMealElement.uploadProgressBarFill.style.width = 0;
    setTimeout(() => {
      newMealElement.uploadProgressBarFill.classList.remove('js-retract');
    }, 1000);
  }

  ///
}
export default updateDomOn;
