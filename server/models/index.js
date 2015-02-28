var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      var sqlCommand = 'SELECT * FROM messages LEFT OUTER JOIN userMsgs ON msg_id = userMsgs.msgID LEFT OUTER JOIN roomMsgs on msg_id = roomMsgs.msgID';
      db.get(sqlCommand);
    }, // a function which produces all the messages
    // function(data, callback)
    post: function (messages, username, roomname) {
      var messagesCmd = 'INSERT INTO messages SET ?';
      var usernameCmd = 'INSERT INTO userMsgs SET ?';
      var roomCmd = 'INSERT INTO roomMsgs SET ?';
      // var field = { // updates
      //   text: '',
      //   dateSent: ''
      // };
      db.insert(messagesCmd, messages);
      db.insert(usernameCmd, username);
      db.insert(roomCmd, roomname);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      var sqlCommand = 'SELECT * FROM users';
      db.get(sqlCommand);
    },
    post: function (field) {
      var sqlCommand = 'INSERT INTO users SET ?'
      // var field = {
      //   username: ''
      // };
      db.insert(sqlCommand, field);
    }
  }
};

