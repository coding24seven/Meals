/// DEPENDENCIES
let multer = require("multer");
const crypto = require("crypto");
import config from '../shared/config.js'; // use variables from the shared config file
require('dotenv').config() // use env variables from .env file

/// ARGUMENT OBJECT FOR THE MAIN MULTER METHOD
const multerArgument = {
  //. this 'filter' check precedes the 'limits' validation. if this 'filter' check fails, 'limits' will not throw an error even if there is one
  fileFilter: function (req, file, cb) {

    console.log("logging out 'req.body' in Multer:", JSON.stringify(req.body, null, 2));

    // user-supplied password is compared against the password from an env variable or against the password defined in the shared config file
    const validPassword = process.env.SUBMIT_MEAL_PASSWORD || config.submitMealPassword;

    // create a custom property 'fileExtension' on 'file'
    file.fileExtension = file.originalname.split('.').slice().pop();

    // check the user-supplied password
    if (req.body.password === validPassword) {
      if (checkFileExtension(file.fileExtension)) {
        cb(null, true);
      } else {
        req.fileFilterError = 'invalid image extension';
        cb(null, false);
      }
    }
    else {
      req.fileFilterError = 'wrong password';
      cb(null, false);
    }

    req.maxFileSize = config.maxUploadFileSize; // custom max file size
  },

  //. 'limits' throw an error if exceeded
  limits: {
    files: 1,
    fileSize: config.maxUploadFileSize, // in bytes,
  },

  //. upload the file
  storage: multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "database/meal-photos/"); },

    filename: (req, file, cb) => {
      const customFileName = crypto.randomBytes(12).toString("hex");
      cb(null, customFileName + "." + file.fileExtension);
    }
  })
}

/// BEGIN MULTERING :-)
const upload = multer(multerArgument).single("image");

function checkFileExtension(ext) {
  const correctExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
  return correctExtensions.includes(ext);
}

/// EXPORT
export default upload
