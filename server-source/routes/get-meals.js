/// IMPORTS
const express = require('express');
const router = express.Router();
import { meals } from '../app';
import { databaseFilePath } from '../../shared/config';
import shuffleArray from '../../shared/shuffle-array.js';
import sendEmailAlert from "../email-alerts/email.js";
import latestClients from "../latest-clients.js"; // a list of clients connected recently
import getDate from '../../shared/get-date';
import getTime from '../../shared/get-time';
import storage from '../disk-operations.js'; // reading and writing to files

/// EXPORTS
export default router;

/// GET ROUTE to display all meals
router.get("/", function (req, res, next) {

  meals.arr = storage.readDatabase(databaseFilePath);
  let mealsShuffled = shuffleArray(meals.arr);
  res.render("meals.ejs", { meals: mealsShuffled });

  // try to add the client to the recent-client list and Return true if the client has been added. Only new clients are added.
  const isNewClient = latestClients.addNewClient(req.ip);

  const hostname = process.env.HOSTNAME // hostname where the app is deployed
  // send email alerts only when the server is deployed on one of these hosts
  const alertableHostnames = ['heroku'];

  // if the current host belongs to alertable hosts and if the current client has been added to the list of new clients
  if (alertableHostnames.includes(hostname) && isNewClient) {
    //  send an email alert with the subject and body
    sendEmailAlert(
      "Meals app requested on '" + hostname + "'",
      "Client " + req.ip + " hit the " + req.url + " route on " + getDate() + " " + getTime() + " server time."
    )
  }
});
