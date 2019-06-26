const fs = require("fs"); // node.js file system

const storage = {

  //read the content of the meals-database file and Return it as an array
  readDatabase: function (databaseFilePath) {
    const rawdata = fs.readFileSync(databaseFilePath);
    console.log("Database read from storage");
    return JSON.parse(rawdata);
  },

  //copy the content of 'meals' array into the database file
  writeDatabase: function (mealsArray, databaseFilePath) {
    const data = JSON.stringify(mealsArray, null, 2);
    fs.writeFile(databaseFilePath, data, function (err) {
      if (err) {
        console.log("Error: Database could not be written to storage");
        console.log(err)
      } else {
        console.log("Database written to storage");
      }
    });
  },

  //
  backupDatabase: function (sourceFilePath, targetFilePath) {
    fs.copyFile(sourceFilePath, targetFilePath, (err) => {
      if (err) {
        console.log("Error: Database could not be backed up to storage");
        console.log(err);
      }
      else {
        console.log("Database backed up to storage");
      }
    });
  }
}

/// EXPORT
export default storage
