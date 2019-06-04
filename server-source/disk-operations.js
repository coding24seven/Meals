let fs = require("fs"); // node.js file system

const storage = {

  //read the content of the meals-database file and Return it as an array
  readDatabase: function (databaseFileName) {
    let rawdata = fs.readFileSync(databaseFileName);
    console.log("Database read from storage");
    return JSON.parse(rawdata);
  },

  //copy the content of 'meals' array into the database file
  writeDatabase: function (mealsArray, databaseFileName) {
    let data = JSON.stringify(mealsArray, null, 2);
    fs.writeFileSync(databaseFileName, data);
    console.log("Database written to storage");
  }

}

/// EXPORT
export default storage
