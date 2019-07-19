
/// IMPORTS
import os from 'os'; // operating system functions
import moment from 'moment'; // time and date functions
import 'dotenv/config';  // use env variables from .env file
import express from "express"; // express.js
const app = express();
app.set('views', './server-source/views'); // ejs templates location
app.set("trust proxy", true); // for the client ip in req.ip
app.use(express.json()); // parse request body as JSON without body-parser
import storage from './disk-operations.js'; // reading and writing to files
import '../shared/console.log-replacement.js'; // prepend date and time to console.log
import workers from './workers.js'; // background workers
import color from '../shared/console-log-colors'; // color console.log
import { databaseFilePath } from '../shared/config';
// routes
import getMeals from './routes/get-meals';
import getAddMeal from './routes/get-add-meal';
import postAddMeal from './routes/post-add-meal';
import putEditMeal from './routes/put-edit-meal';
import catchAll from './routes/catch-all';

/// EXPORTS
export const meals = { arr: null }; // this object holds an array that holds meal objects

/// STATIC ASSETS SERVED
app.use(express.static("public"));
app.use(express.static("database/meal-photos"));

/// DISPLAY OS INFO
console.log('OS uptime:', moment().startOf('day').seconds(os.uptime()).format('HH:mm:ss'));

/// READ THE DATABASE FROM FILE INTO THE ARRAY BEFORE THE SERVER STARTS
meals.arr = storage.readDatabase(databaseFilePath);

/// SERVER START
const port = process.env.PORT;
const IP = process.env.IP;
app.listen(port, IP, function () {
  const ipInColor = color.fg.Yellow + this.address().address + color.Reset
  const portInColor = color.fg.Blue + this.address().port + color.Reset
  console.log("Meals server has started on:", ipInColor + ":" + portInColor);
});

/// BACKGROUND WORKERS START
workers.logOutAtInterval(60000); // log out server status and clients list
workers.backupJsonDB(databaseFilePath, 86400000);  // backup meals.json once per day

/// ROUTES
app.use('/', getMeals);
app.use('/meals', getMeals);
app.use('/meals/new', getAddMeal);
app.use('/meals', postAddMeal);
app.use('/meals/edit', putEditMeal);
app.use(catchAll);

///
