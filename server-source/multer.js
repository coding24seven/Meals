/// DEPENDENCIES
let multer = require("multer");
const crypto = require("crypto");

// TODO: CHANGE THE GLOBAL CONST TO LOCAL
const maxUploadFileSize = 500000 // in bytes

/// ARGUMENT OBJECT FOR THE MAIN MULTER METHOD
const multerArgument = {
  //. this 'filter' check precedes the 'limits' validation. if this 'filter' check fails, 'limits' will not throw an error even if there is one
  fileFilter: function (req, file, cb) {

    console.log("logging out 'req.body' in Multer:", JSON.stringify(req.body, null, 2))

    // check the client-supplied password against 'demo'
    if (req.body.password == 'demo') {
      cb(null, true)
    }
    else {
      req.fileFilterError = 'wrong password'
      cb(null, false)
    }

    req.maxFileSize = maxUploadFileSize // custom max file size
  },

  //. 'limits' throw an error if exceeded
  limits: {
    files: 1,
    fileSize: maxUploadFileSize, // in bytes,
  },

  //. upload the file
  storage: multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "database/meal-photos/"); },

    filename: (req, file, cb) => {
      let customFileName = crypto.randomBytes(12).toString("hex");
      let fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
      if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
        cb(null, customFileName + "." + fileExtension);
      } else { cb(null, customFileName); }
    }
  })
}

/// BEGIN MULTERING :-)
const upload = multer(multerArgument).single("image");

/// EXPORT
export default upload
