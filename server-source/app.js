
/// DEPENDENCIES
require('dotenv').config(); // use env variables from .env file
let express = require("express"); // express.js
let app = express();
app.set('views', './server-source/views'); // ejs templates location
app.set("trust proxy", true); // for the client ip in req.ip
app.use(express.json()) // parse request body as JSON without body-parser
import storage from './disk-operations.js'; // reading and writing to files
import shuffleArray from '../shared/shuffle-array.js';
import '../shared/console.log-replacement.js'; // prepend date and time to console.log
import workers from './workers.js'; // background workers
import sendEmailAlert from "./email-alerts/email.js";
import latestClients from "./latest-clients.js"; // a list of clients connected recently
import upload from './multer.js'; // handle file uploads from a client
import color from '../shared/console-log-colors'; // color console.log
import sanitizeString from '../shared/sanitize-string';
import getDate from '../shared/get-date';
import getTime from '../shared/get-time';

/// REQUEST-LOGGING MIDDLEWARE (MUST BE PLACED ABOVE OTHER APP.USE() THINGS THAT YOU WANT LOGGED)
// TODO: UNCOMMENT
// app.use(function (req, res, next) {
// console.log(req.method + " request from " + req.ip + " at '" + req.url + "'");
//   next();
// });

/// STATIC ASSETS SERVED - MUST BE PLACED BELOW THE MIDDLEWARE THAT ATTEMPTS TO LOG THESE OUT
app.use(express.static("public"));
app.use(express.static("database/meal-photos"));

/// STORAGE
const databaseFile = "database/meals.json";
let meals = []; // this array holds meal objects

/// READ THE DATABASE FROM FILE INTO THE ARRAY BEFORE THE SERVER STARTS
meals = storage.readDatabase(databaseFile);

/// SERVER START
const port = process.env.PORT;
const IP = process.env.IP;
app.listen(port, IP, function () {
  const ipInColor = color.fg.Yellow + this.address().address + color.Reset
  const portInColor = color.fg.Blue + this.address().port + color.Reset
  console.log("Meals server has started on:", ipInColor + ":" + portInColor);
});

/// BACKGROUND WORKERS START
workers.logOutAtInterval() // log out server status and clients list

/// ROUTER
//. ROOT ROUTE to redirect to '/meals'
app.get("/", function (req, res) { res.redirect("/meals"); });

//. GET ROUTE to display all meals
app.get("/meals", function (req, res) {
  meals = storage.readDatabase(databaseFile);
  let mealsShuffled = shuffleArray(meals);
  res.render("meals.ejs", { meals: mealsShuffled });

  // try to add the client to the recent-client list and Return true if the client has been added. Only new clients are added.
  const isNewClient = latestClients.addNewClient(req.ip)

  const hostname = process.env.HOSTNAME // hostname where the app is deployed
  // send email alerts only when the server is deployed on one of these hosts
  const alertableHostnames = ['heroku']

  // if the current host should send alerts and if the current client has been added to the list of new clients
  if (alertableHostnames.includes(hostname) && isNewClient) {
    //  send an email alert with the subject and body
    sendEmailAlert(
      "Meals app requested on '" + hostname + "'",
      "Client " + req.ip + " hit the " + req.url + " route on " + getDate() + " " + getTime() + " server time."
    )
    console.log(getDate());
  }
});

//. GET ROUTE that renders the new-meal submission form
app.get("/meals/new", function (req, res) {
  res.render("new-meal.ejs");
});

//. POST ROUTE that receives the data from the new-meal submission form's handler
app.post("/meals", function (req, res, next) {

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

      console.log("req.fileFilterError:", req.fileFilterError, ":", req.invalidImageExtension);
    }
    // no errors and so the image file has been uploaded
    else if (req.file) {

      // max 16 words. max 22 letters in a word.
      const mealName = sanitizeString(req.body.name, 16, 22);

      meals.push({
        name: mealName,
        date: "N/A",
        image: req.file.filename,
        id: meals.length,
        count: 0
      });

      storage.writeDatabase(meals, databaseFile);

      res.status(200).json({
        type: "meal added",
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

//. GET ROUTE TO EDIT MEAL DATA
app.post("/meals/edit", function (req, res) {
  const min = 0;
  const max = meals.length - 1;
  const payload = req.body;
  console.log("body:", payload)
  const id = parseInt(payload.id);
  // meal id must be valid
  if (Number.isInteger(id) && id >= min && id <= max) {

    const type = {
      "todays meal": function () {
        const clientDate = payload.todaysDate;
        if (meals[id].date != clientDate) {
          meals[id].date = clientDate;
          meals[id].count++;
          console.log("UserX has had " + color.fg.Yellow + meals[id].name, color.Reset + "today");
          res.status(200).json({
            type: "meal is todays",
            mealName: meals[id].name
          });
        }
        // should never happen if 'today' button is correctly hidden
        else {
          res.status(400).json({
            type: "meal is already todays",
            mealName: meals[id].name
          });
          console.log(meals[id].name, "has already been had today");
        }
      },
      "rename": function () {
        const newName = sanitizeString(payload.mealName, 16, 22);
        const prevName = meals[id].name;
        meals[id].name = newName;
        res.status(200).send({
          type: "meal renamed",
        })
        console.log(`${color.fg.Yellow}${prevName}${color.Reset} changed to ${color.fg.Yellow}${meals[id].name}${color.Reset}`);
      },
      "default": function () { console.log("unknown request type"); }
    }
    type.hasOwnProperty(payload.type) ? type[payload.type]() : type['default']();

    storage.writeDatabase(meals, databaseFile);
  }
  // id is not valid
  else {
    console.log("request to edit a meal received with an invalid meal id")
    res.redirect("/");
  }
});

//. GET ROUTE to catch all unhandled parameters
app.get("*", function (req, res) {

  // do not display the error to the client
  res.render("meals.ejs", { meals });

  const error = [
    "Unhandled URL parameter caught. Resource ",
    req.path,
    " requested but unavailable for serving."
  ]

  // color the requested-resource path inside the error message
  error[error.indexOf(req.path)] = color.fg.Red + req.path + color.Reset

  console.log(error.join('')) // do not use (' ') because the color-markup array elements will then add their own space 
});
///

