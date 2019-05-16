// console.log replacement that prepends date and time
const originalConsoleLog = console.log;
console.log = function log() {
  originalConsoleLog.apply(console, [dateAndTime(), ...arguments]);
};

let fs = require("fs"); // node.js file system
let express = require("express"); // express.js backend
let app = express();
app.set("trust proxy", true); // for req.ip

// TODO: UNCOMMENT
// middleware for logging (must be placed above other app.use() things that you want logged)
// app.use(function (req, res, next) {
//   console.log(req.method + " request from " + req.ip + " at '" + req.url + "'");
//   next();
// });

// must be placed below the middleware
app.use(express.static("public"));
app.use(express.static("meal-photos"));
app.use(express.static("images"));

// module for uploads of pictures with a unique file name
let multer = require("multer");
const crypto = require("crypto");
let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "meal-photos/"); },
    filename: (req, file, cb) => {
      let customFileName = crypto.randomBytes(12).toString("hex");
      let fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
      if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
        cb(null, customFileName + "." + fileExtension);
      } else { cb(null, customFileName); }
    }
  })
});

// storage
const database = "meals.json"; // storage filename
let meals; // the array that holds meal objects

const port = process.env.PORT;
const IP = process.env.IP;
app.listen(port, IP, function () {
  console.log("Meals server has started on " + this.address().address + ":" + this.address().port);
});

// log to console at a set interval
setInterval(function () { console.log("Status: App online"); }, 60000);

// ROOT ROUTE to redirect to '/meals'
app.get("/", function (req, res) { res.redirect("/meals"); });

// GET ROUTE to display all meals
app.get("/meals", function (req, res) {
  readDatabase(database);
  let mealsShuffled = shuffle(meals);
  res.render("index.ejs", { meals: mealsShuffled });
});

//GET ROUTE to render a new-meal submission form
app.get("/meals/new", function (req, res) {
  res.render("new.ejs");
});

//POST ROUTE to intercept data from the new-meal submission form
app.post("/meals", upload.single("image"), function (req, res, next) {
  // req.file is the name="image" file. req.body holds the text fields
  meals.push({
    name: req.body.name,
    lastCookedOn: "N/A",
    image: req.file.filename,
    id: meals.length,
    count: 0
  });
  writeDatabase(database);
  res.redirect("/");
});

//GET ROUTE MEAL PREPARED TODAY
app.get("/meals/:id/:date", function (req, res) {
  let min = 0;
  let max = meals.length;
  let id = parseInt(req.params.id);
  let clientDate = req.params.date;
  if (Number.isInteger(id) && id >= min && id < max && meals[id].lastCookedOn != clientDate) {
    meals[id].lastCookedOn = clientDate;
    meals[id].count++;
    writeDatabase(database);
    console.log(meals[id].name, "has been prepared");
  }
  res.redirect("/");
});
//GET ROUTE to catch all unhandled parameters
app.get("*", function (req, res) {
  res.redirect("/");
});

// ======================== FUNCTIONS =========================

//copy the content of 'database' file into 'meals' array
function readDatabase(database) {
  let rawdata = fs.readFileSync(database);
  meals = JSON.parse(rawdata);
  console.log("Database read from storage");
}

//copy the content of 'meals' array into 'database' file
function writeDatabase(database) {
  let data = JSON.stringify(meals, null, 2);
  fs.writeFileSync(database, data);
  console.log("Database written to storage");
}

//shuffle and Return a copy of the original database
function shuffle(array) {
  var result = [],
    source = array.concat([]);
  while (source.length) {
    let index = Math.floor(Math.random() * source.length);
    result.push(source.splice(index, 1)[0]);
  }
  return result;
}

//obtain date and time in a string format, for example "01/10/2018 22:41:41"
function dateAndTime() {
  let d = new Date();
  let day = d.getDate() < 10 ? '0' + d.getDate().toString() : d.getDate();
  let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1).toString() : d.getMonth() + 1;
  let year = d.getFullYear();
  let hours = d.getHours() < 10 ? '0' + d.getHours().toString() : d.getHours();
  let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes().toString() : d.getMinutes();
  let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds().toString() : d.getSeconds();
  d = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds;
  return d;
}
