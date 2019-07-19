/// IMPORTS
const express = require('express');
const router = express.Router();
import { meals } from '../app';
import { databaseFilePath, types } from '../../shared/config';
import storage from '../disk-operations.js'; // reading and writing to files
import sanitizeString from '../../shared/sanitize-string';
import sanitizeDate from '../../shared/sanitize-date';
import sanitizeCount from '../../shared/sanitize-count';
import color from '../../shared/console-log-colors'; // color console.log

/// EXPORTS
export default router;

//. PUT ROUTE TO EDIT MEAL PROPERTIES SUCH AS NAME, DATE, COUNT
router.put("/", function (req, res, next) {
  const min = 0;
  const max = meals.arr.length - 1;
  const payload = req.body;
  console.log("server received:", payload);
  const id = parseInt(payload.id);
  // meal id must be valid
  if (Number.isInteger(id) && id >= min && id <= max) {

    const updateType = {
      "today update": function () {
        const clientDate = sanitizeDate(payload.val);
        if (clientDate && meals.arr[id].date != clientDate) {
          meals.arr[id].date = clientDate;
          meals.arr[id].count++;
          console.log("UserX has had " + color.fg.Yellow + meals.arr[id].name, color.Reset + "today");
          res.status(200).json({
            type: types.mealIsTodays,
            val: meals.arr[id].date,
            val2: meals.arr[id].count
          });
        }
        // should never happen if 'today' button is correctly hidden
        else {
          res.status(400).json({
            type: types.mealIsAlreadyTodays,
            mealName: meals.arr[id].name
          });
          console.log(meals.arr[id].name, "has already been had today");
        }
      },
      "name update": function () {
        const newName = sanitizeString(payload.value, 16, 22);
        const prevName = meals.arr[id].name;
        meals.arr[id].name = newName;
        res.status(200).send({
          type: types.nameUpdated,
          val: newName
        })
        logUpdate(id, prevName, meals.arr[id].name);
      },
      "date update": function () {
        const newDate = sanitizeDate(payload.value);
        if (newDate) {
          const prevDate = meals.arr[id].date;
          meals.arr[id].date = newDate;
          res.status(200).send({
            type: types.dateUpdated,
            val: newDate
          })
          logUpdate(id, prevDate, meals.arr[id].date);
        } else {
          res.status(400).json({
            type: types.badDate
          });
          console.log(newDate, "is a bad date");
        }
      },
      "count update": function () {
        const newCount = sanitizeCount(payload.value);
        if (newCount) {
          const prevCount = meals.arr[id].count;
          meals.arr[id].count = newCount;
          res.status(200).send({
            type: types.countUpdated,
            val: newCount
          })
          logUpdate(id, prevCount, meals.arr[id].count);
        } else {
          res.status(400).json({
            type: types.badCountFormat
          });
        }
      },
      "default": function () { console.log("unknown request type"); }
    }
    updateType.hasOwnProperty(payload.type) ? updateType[payload.type]() : updateType['default']();

    storage.writeDatabase(meals.arr, databaseFilePath);
  }
  // id is not valid
  else {
    console.log("request to edit a meal received with an invalid meal id")
    res.redirect("/");
  }

  function logUpdate(id, previous, current) {
    console.log(`Meal ID ${color.fg.Blue}${id}: ${color.Reset}${color.fg.Yellow}${previous}${color.Reset} changed to ${color.fg.Yellow}${current}${color.Reset}`);
  }
});
