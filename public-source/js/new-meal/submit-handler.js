import state from '../state';
import elementTransform, { newMealElement } from '../elements';
import actOn from './act-on';

/// NEW-MEAL SUBMIT FORM HANDLER
export default function handleSubmit(event) {
  event.preventDefault();

  // abort if no valid image has been picked yet
  if (!state.imageIsReadyForUpload) return

  //. FORM DATA
  const formData = new FormData(newMealElement.newMealForm)

  console.log("logging out all keys and values in the form-submit handler:")
  for (const [key, value] of formData.entries()) {
    console.log(key + ', ' + value);
  }

  //. REQUEST AND ITS HANDLER
  const request = new XMLHttpRequest();
  request.open("POST", "/meals");
  request.upload.addEventListener("progress", function (e) {
    if (e.lengthComputable) {
      console.log(e.loaded + " / " + e.total);
      newMealElement.uploadProgressBarFill.style.width = (e.loaded / e.total) * 100 + "%";
    }
  }, false);

  request.onloadstart = function (e) {
    actOn.fileStartsUploading();
  }
  request.onloadend = function (e) {
    actOn.fileEndsUploading();
  }

  request.onreadystatechange = onreadystatechangeHandler
  request.send(formData);

  function onreadystatechangeHandler() {
    if (request.readyState === 4) {

      elementTransform.show(newMealElement.uploadProgressBar, false);

      // image uploaded
      if (request.status === 200) {

        // reset imageIsReadyForUpload state - applies to future upload attempts
        state.imageIsReadyForUpload = false;

        const parsedResponse = JSON.parse(request.response);
        const type = parsedResponse.type.toLowerCase();
        const { mealName } = parsedResponse;

        // make the new-meal-added message display the just-added meal
        elementTransform.setText(newMealElement.newMealAddedMessage, {
          type,
          mealName
        })
        // reveal the new-meal-added message
        newMealElement.newMealAddedMessage.style.display = 'initial';

        // change the new-meal heading from 'new meal' to sth like 'add next meal'
        elementTransform.setText(newMealElement.newMealHeading, { type });

        // hide
        elementTransform.show(newMealElement.imagePreview, state.imageIsReadyForUpload);
        elementTransform.show(newMealElement.uploadBox, state.imageIsReadyForUpload);

        // image not uploaded. some error Returned
      } else {
        const parsedResponse = JSON.parse(request.response);
        // error json response includes properties: error, message
        const error = parsedResponse.error.toLowerCase();
        const { message } = parsedResponse;

        const errorHandlers = {
          "wrong password": function () {
            // display a styled error message as the password input's placeholder
            newMealElement.passwordInput.value = '' // clear the password input
            newMealElement.passwordInput.classList.add('js-error')
            // give the element a modifier so the language function can incorporate it
            elementTransform.setText(newMealElement.passwordInput, {
              type: error,
              message: null
            })
          },

          "file too large": function () {
            // 'message' being passed is a max file size in kb
            actOn.unacceptableFile(error, parseFloat(message) / 1000);
          },

          "invalid image extension": function () {
            actOn.unacceptableFile(error, "");
          },

          default: function () {
            console.error("unknown error");
          }
        }
        // run the function that corresponds to the error received from the server, or run the default function if error is unknown
        errorHandlers.hasOwnProperty(error) ? errorHandlers[error]() : errorHandlers['default']();

        console.error("request.statusText:", request.statusText);
      }
    }
  };
}
