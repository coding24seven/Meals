import path from 'path';
import moment from 'moment'; // time and date functions
import storage from './disk-operations.js'; // reading and writing to files
import latestClients from "./latest-clients.js" // a list of clients connected recently

const workers = {

  // LOG OUT TO CONSOLE AT A SET INTERVAL
  logOutAtInterval: function (interval) {
    setInterval(function () {
      console.log("Status: App online");
      console.log("Latest clients: ", latestClients.list)
    }, interval);
  },
  // BACKUP THE JSON DATABASE
  backupJsonDB: function (meals, databaseFilePath, interval) {
    setInterval(() => {
      const dateTime = moment().format("YYYY-MM-DD-HH-mm-ss");
      const dirName = path.dirname(databaseFilePath);
      const ext = path.extname(databaseFilePath);
      const name = path.basename(databaseFilePath, ext);
      const filePath = path.join(dirName, name) + '-' + dateTime + ext;
      storage.writeDatabase(meals, filePath)
    }, interval);
  }
}

export default workers
