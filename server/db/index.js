var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  user: "root",
  password: "ramboner",
  database: "chat"
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports.addUsername = function(username) {
  connection.beginTransaction(function(err){
    if(err){
      throw err;
    }
    connection.query('INSERT INTO users SET username=?', username, function(err, result){
      if(err){
        connection.rollback(function(err){
          throw err;
        })
      }
      var log = 'Post ' + result.insertId + ' added';
      connection.query('INSERT INTO log SET data=?', log, function(err, result){
        if(err){
          connection.rollback(function(err){
            throw err;
          })
        }
        connection.commit(function(err){
          if(err){
            connection.rollback(function(err){
              throw err;
            })
          }
          console.log('SUCCESS!!!');
        })
      })
    });
  });
};


