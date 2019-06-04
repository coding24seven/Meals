import latestClients from "./latest-clients.js" // a list of clients connected recently

const workers = {

  /// LOG OUT TO CONSOLE AT A SET INTERVAL
  logOutAtInterval: function () {
    setInterval(function () {
      console.log("Status: App online");
      console.log("Latest clients: ", latestClients.list)
    }, 60000);
  }

}

export default workers
