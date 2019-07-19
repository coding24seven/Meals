/// IMPORTS
const express = require('express');
const router = express.Router();
import { meals } from '../app';
import color from '../../shared/console-log-colors'; // color console.log

/// EXPORTS
export default router;

/// GET ROUTE to catch all unhandled parameters
router.get('*', function (req, res) {

  // display the meals, not the error, to the client
  res.render("meals.ejs", { meals: meals.arr });

  const error = [
    "Unhandled URL parameter caught. Resource ",
    req.path,
    " requested but unavailable for serving."
  ]

  // color the requested-resource path inside the error message
  error[error.indexOf(req.path)] = color.fg.Red + req.path + color.Reset

  console.log(error.join('')) // do not use (' ') because the color-markup array elements will then add their own space 
});
