/*
 maintain a temporary list of clients who connected to the server.
 there are no log files that store this data permanently.
*/

const clients = {

  // client list
  list: [],

  // add the client and Return true if the client is not already on the list
  addNewClient: function (client) {
    if (!this.list.includes(client)) {

      // add the new client
      this.list.push(client)

      // will clear the recent-client list after 3600000 ms = 1h has passed since the last client was added
      this.clear(3600000)

      return true // client added
    }
  },

  // clears the client list after the time specified
  clear: function (interval) {
    setTimeout(this.list = [], interval)
  }
}

/// EXPORT
export default clients
