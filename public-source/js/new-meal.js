import applyEventListeners from './eventListeners'
import updateLanguage from './updateLanguage'
import { newMealElement, setElementText } from './elements'
import state from './state'

/// unique page identifier: page-id-new-meal

// continue only if the matching page has been loaded
if (document.getElementById('page-id-new-meal')) {
  console.log('page-id-new-meal loaded');

  //. ADD ALL EVENT LISTENERS
  applyEventListeners(); // site-wide event listeners

  // file picker input's 'change' event
  newMealElement.fileUploadInput.addEventListener('change', handleFileSelect, false);

  // essential: reset the input's value on 'click' so 'change' event is triggered even if the input value remained the same
  newMealElement.fileUploadInput.addEventListener('click', function () {
    this.value = null;
    state.imageIsReadyForUpload = false;

    // maintenance: remove the styled error message inside the file-picking label
    setElementText(newMealElement.pickImageText, null);
    newMealElement.pickImageText.classList.remove('js-error');

    // maintenance: hide
    setTimeout(() => {
      showElement(newMealElement.imagePreview, state.imageIsReadyForUpload);
      showElement(newMealElement.uploadBox, state.imageIsReadyForUpload);
    }, 500);

  }, false);


  // new-meal form 'submit' event
  newMealElement.newMealForm.addEventListener("submit", newMealFormHandler);

  // clear the styled errors from the password-input placeholder's, on focus
  newMealElement.passwordInput.addEventListener("focus", function () {
    setElementText(this, null);
    this.classList.remove('js-error');
  })

  //. UPDATE THE LANGUAGE (LOCALLY STORED OR DEFAULT)
  let language = updateLanguage();

  /// NEW-MEAL SUBMIT FORM HANDLER
  function newMealFormHandler(event) {
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
      showElement(newMealElement.uploadProgressBar);
    }
    request.onloadend = function (e) {
      newMealElement.uploadProgressBarFill.classList.add('js-retract');
      newMealElement.uploadProgressBarFill.style.width = 0;
    }

    request.onreadystatechange = onreadystatechangeHandler
    request.send(formData);

    function onreadystatechangeHandler() {
      if (request.readyState === 4) {

        showElement(newMealElement.uploadProgressBar, false);

        // image uploaded
        if (request.status === 200) {

          // reset imageIsReadyForUpload state - applies to future upload attempts
          state.imageIsReadyForUpload = false;

          const parsedResponse = JSON.parse(request.response);
          const type = parsedResponse.type.toLowerCase();
          const { mealName } = parsedResponse;

          // make the new-meal-added message display the just-added meal
          setElementText(newMealElement.newMealAddedMessage, {
            type,
            mealName
          })
          // reveal the new-meal-added message
          newMealElement.newMealAddedMessage.style.display = 'initial';

          // change the new-meal heading from 'new meal' to sth like 'add next meal'
          setElementText(newMealElement.newMealHeading, { type });

          // hide
          showElement(newMealElement.imagePreview, state.imageIsReadyForUpload);
          showElement(newMealElement.uploadBox, state.imageIsReadyForUpload);

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
              setElementText(newMealElement.passwordInput, {
                type: error,
                message: null
              })
            },

            "file too large": function () {
              // 'message' being passed is a max file size in kb
              actOnUnacceptableFile(error, parseFloat(message) / 1000);
            },

            "invalid image extension": function () {
              actOnUnacceptableFile(error, "");
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

  /// FILE UPLOAD HANDLER - TRIGGERED BY THE FILE PICKER INPUT'S 'CHANGE' EVENT
  function handleFileSelect(event) {

    // maintenance: remove the "added: example meal" message from view
    newMealElement.newMealAddedMessage.style.display = "none"

    // retrieve the user-picked file
    const pickedFile = event.target.files[0];

    //. file has just been selected in the file picker
    if (pickedFile) {

      const reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
          showElement(newMealElement.imagePreview);
          newMealElement.imagePreview.innerHTML = ['<img src="', e.target.result, '" title="', theFile.name, '" width="100%" />'].join('');

          // allow the DOM element above to update first
          setTimeout(() => {
            // the image preview must have minHeight
            const minHeight = 60 // px
            if (newMealElement.imagePreview.clientHeight > minHeight) {
              actOnAcceptableFile();
            }
            // the image is too small or does not display correctly
            else {
              const clientError = "image preview failed";
              actOnUnacceptableFile(clientError, "");
            };

          }, 1); // setTimeout ends
        };
      })(pickedFile);

      // read the file
      reader.readAsDataURL(pickedFile);
    }

    //. no file has just been selected in the file picker (via cancel button or escape)
    else { }
  }

  /// REMOVE RELEVANT ELEMENTS FROM VIEW IF NO VALID FILE SELECTED
  function showElement(element, show = true) {
    if (show) {
      element.classList.add("js-show")
    } else {
      element.classList.remove("js-show")
    };
  }

  /// SET STATE, SHOW ERROR MESSAGES, HIDE THE PREVIEW AND SUBMIT BUTTON - WHEN THE FILE IS TOO LARGE, HAS A WRONG EXTENSION, ETC.
  function actOnUnacceptableFile(error, midMessage) {
    // reset imageIsReadyForUpload state - applies to future upload attempts
    state.imageIsReadyForUpload = false;

    // style the error message inside the file-picker's label
    newMealElement.pickImageText.classList.add('js-error')

    // give the element a modifier so the language function can incorporate it
    setElementText(newMealElement.pickImageText, {
      type: error,
      midMessage
    });

    // hide
    showElement(newMealElement.imagePreview, state.imageIsReadyForUpload);
    showElement(newMealElement.uploadBox, state.imageIsReadyForUpload);
  }

  /// SET STATE, SHOW THE PREVIEW AND SUBMIT BUTTON - WHEN FILE IS VALID FOR UPLOAD
  function actOnAcceptableFile() {
    state.imageIsReadyForUpload = true;
    // show
    showElement(newMealElement.uploadBox, state.imageIsReadyForUpload)
    showElement(newMealElement.imagePreview, state.imageIsReadyForUpload)
  }

  ///
} //  end of 'if the matching page has been loaded'

