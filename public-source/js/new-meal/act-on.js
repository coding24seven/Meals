import state from '../state';
import elementTransform, { newMealElement } from '../elements';

const actOn = {
  /// 
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

  /// SET STATE, SHOW THE PREVIEW AND SUBMIT BUTTON - WHEN FILE IS VALID FOR UPLOAD
  acceptableFile: function () {
    state.imageIsReadyForUpload = true;
    // show
    elementTransform.show(newMealElement.uploadBox, state.imageIsReadyForUpload)
    elementTransform.show(newMealElement.imagePreview, state.imageIsReadyForUpload)
  },

  /// SET STATE, SHOW ERROR MESSAGES, HIDE THE PREVIEW AND SUBMIT BUTTON - WHEN THE FILE IS TOO LARGE, HAS A WRONG EXTENSION, ETC.
  unacceptableFile: function (error, midMessage) {
    // reset imageIsReadyForUpload state - applies to future upload attempts
    state.imageIsReadyForUpload = false;

    // style the error message inside the file-picker's label
    newMealElement.pickImageText.classList.add('js-error')

    // give the element a modifier so the language function can incorporate it
    elementTransform.setText(newMealElement.pickImageText, {
      type: error,
      midMessage
    });

    // hide
    elementTransform.show(newMealElement.imagePreview, state.imageIsReadyForUpload);
    elementTransform.show(newMealElement.uploadBox, state.imageIsReadyForUpload);
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
export default actOn;
