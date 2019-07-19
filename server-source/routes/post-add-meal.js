/// IMPORTS
const express = require('express');
const router = express.Router();
import { meals } from '../app';
import { databaseFilePath, types } from '../../shared/config';
import storage from '../disk-operations.js'; // reading and writing to files
import upload from '../multer.js'; // handle file uploads from a client
import sanitizeString from '../../shared/sanitize-string';

/// EXPORTS
export default router;

//. POST ROUTE that receives the data from the new-meal submission form's handler
router.post("/", function (req, res, next) {

  // call Multer's upload, which performs checks and then uploads
  // note: req.file is the name="image" file. req.body holds the text fields
  upload(req, res, function (err) {

    // first, deal with Multer internal errors (for example 'limits' exceeded). Multer may throw an error only after the 'filters' check has passed
    if (err) {
      res.status(400).json({
        error: err.message, // for example 'File too large'
        message: req.maxFileSize
      });

      console.log('Multer error:', err.message)
      return
    }

    // filter error
    if (req.fileFilterError) {
      res.status(400).json({
        error: req.fileFilterError, // custom error such as 'wrong password'
        message: "no message this time"
      });

      console.log("req.fileFilterError:", req.fileFilterError);
    }
    // no errors and so the image file has been uploaded
    else if (req.file) {

      // max 16 words. max 22 letters in a word.
      const mealName = sanitizeString(req.body.name, 16, 22);

      meals.arr.push({
        name: mealName,
        date: "N/A",
        image: req.file.filename,
        id: meals.arr.length,
        count: 0
      });

      storage.writeDatabase(meals.arr, databaseFilePath);

      res.status(200).json({
        type: types.mealAdded,
        mealName
      });

      console.log("client", req.ip, "added:", mealName)
    }
    // the image file has not been uploaded for an unknown reason
    else {
      const error = 'unknown error'
      res.status(400).json({ error });
      console.log(error)
    }
  })
});
