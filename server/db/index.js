var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  user: "root",
  password: "ramboner",
  database: "chat"
});
connection.connect();
// module.exports = connection;

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports.get = function(sqlCommand) {
  connection.query(sqlCommand, function(err) {
    if (err) {
      connection.rollback(function (err) {
        throw err;
      })
    }
    connection.commit(function(err){
      if(err){
          connection.rollback(function(err){
            throw err;
          })
        }
    });
  });
};

module.exports.insertUser = function(sqlCommand, field) {
  connection.query(sqlCommand, field, function(err, result) {
    if (err) {
      connection.rollback(function (err) {
        throw err;
      })
    }
    connection.commit(function(err){
      if(err){
        connection.rollback(function(err){
          throw err;
        })
      }
    });
  });
};



module.exports.insertMsgs = function(fieldObj) {
  var messageID;
  var messageField = {text: fieldObj['text'], dateSent: fieldObj['createdAt']};
  var roomField = {roomname: fieldObj['roomname']};
  var userField = {username: fieldObj['username']};
  // add to message table
  connection.query('INSERT INTO messages SET ?', messageField, function(err, result) {
    if (err) {
      connection.rollback(function (err) {
        throw err;
      })
    }
    messageID = result.insertID;
    connection.commit(function(err){
      if(err){
        connection.rollback(function(err){
          throw err;
        })
      }
    });
  });
  // roomMsgs         // {roomID: xxx, msgID: resultId}
  connection.query('INSERT INTO roomMsgs SET ?', roomField, function(err) {
    if (err) {
      connection.rollback(function (err) {
        throw err;
      })
    }
    connection.commit(function(err){
      if(err){
        connection.rollback(function(err){
          throw err;
        })
      }
    });
  });
  // userMsgs// {userID: xxx, msgID: resultId}
  connection.query('INSERT INTO userMsgs SET ?', userField, function(err) {
    if (err) {
      connection.rollback(function (err) {
        throw err;
      })
    }
    connection.commit(function(err){
      if(err){
        connection.rollback(function(err){
          throw err;
        })
      }
    });
  });
};


//module.exports.addUsername = function(username) {
//  connection.beginTransaction(function(err){
//    if(err){
//      throw err;
//    }
//    connection.query('INSERT INTO users SET username=?', username, function(err, result){
//      if(err){
//        connection.rollback(function(err){
//          throw err;
//        })
//      }
//      var log = 'Post ' + result.insertId + ' added';
//      connection.query('INSERT INTO log SET data=?', log, function(err, result){
//        if(err){
//          connection.rollback(function(err){
//            throw err;
//          })
//        }
//        connection.commit(function(err){
//          if(err){
//            connection.rollback(function(err){
//              throw err;
//            })
//          }
//          console.log('SUCCESS!!!');
//        })
//      })
//    });
//  });
//};


