/*
 maintain a temporary list of clients who connected to the server.
 there are no log files to store the data permanently.
*/

const clients = {

  // client list
  list: [],

  // add the client and Return true if the client is not already on the list
  addNewClient: function (client) {
    if (!this.list.includes(client)) {
      this.list.push(client)
      return true
    }
  },

  // clear the client list at the specified interval
  clear: function (interval) {
    setInterval(() => {
      this.list = []
    }, interval)
  }
}

/// EXPORT
module.exports = clients
