import elementTransform, { newMealElement } from '../elements';
import state from '../state';
import handleFilePicked from './pick-file-handler';
import handleSubmit from './submit-handler';

/// unique page identifier: page-id-new-meal

// continue only if the matching page has been loaded
if (document.getElementById('page-id-new-meal')) {
  console.log('page-id-new-meal loaded');

  // file picker input's 'change' event
  newMealElement.fileUploadInput.addEventListener('change', handleFilePicked, false);

  // essential: reset the input's value on 'click' so 'change' event is triggered even if the input value remained the same
  newMealElement.fileUploadInput.addEventListener('click', function () {
    this.value = null;
    state.uploadableImage.isReadyForUpload = false;

    setTimeout(() => {
      // maintenance: remove the styled error message inside the file-picking label
      elementTransform.setText(newMealElement.pickImageText, null);
      newMealElement.pickImageLabel.classList.remove('js-error');

      // maintenance: hide the image preview
      elementTransform.show(newMealElement.imagePreview, state.uploadableImage.isReadyForUpload);
      elementTransform.show(newMealElement.uploadBox, state.uploadableImage.isReadyForUpload);
    }, 1000);

  }, false);

  // new-meal form 'submit' event
  newMealElement.newMealForm.addEventListener("submit", handleSubmit);

  // clear the styled errors from the password-input placeholder's, on focus
  newMealElement.passwordInput.addEventListener("focus", function () {
    elementTransform.setText(this, null);
    this.classList.remove('js-error');
  })

  ///
} //  end of 'if the matching page has been loaded'
