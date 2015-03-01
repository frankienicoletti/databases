var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      var sqlCommand = 'SELECT messages.msg_id, messages.text, messages.roomname from messages \
                       left outer join users on (messages.userID = users.user_id) \
                       order by messages.msg_id desc';
      db.query(sqlCommand, function(err, results){
        if(err){
          throw err;
        }
        callback(results);
      });
    }, // a function which produces all the messages


    post: function (params, callback) {
      var sqlCommand = 'INSERT INTO messages(text, dateSent, userID, roomname) \
                        values (?, (SELECT id from users WHERE username = ? limit 1), ?)';
      db.query(sqlCommand, params, function(err, results){
        if(err){
          throw err;
        }
        callback(results);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var sqlCommand = 'SELECT * FROM users';
      db.query(sqlCommand, function(err, results){
        if(err){
          throw err;
        }
        callback(results);
      });
    },
    post: function (params, callback) {
      var sqlCommand = 'INSERT INTO users(username) values (?)';
      db.query(sqlCommand, params, function(err, results){
        if(err){
          throw err;
        }
        callback(results);
      });
    }
  }
};

