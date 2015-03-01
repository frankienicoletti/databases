/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var Sequelize = require('sequelize');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;
var db = require('../db');


describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    var orm = new Sequelize('chat', 'root', 'ramboner');

    //var tablenames = ['messages', 'users']

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
     db.query("truncate messages", done);
     //db.Users.query("truncate users", done);

     // for (var i=0; i<tablenames.length; i++) {
     //   dbConnection.query("truncate " + tablenames[i], done);
     // }
  });

  // afterEach(function() {
  //   db.end();
  // });

  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/users",
              json: { username: "Valjean" }
    }, function () {
      // Post a message to the node chat server:
      request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/messages",
              json: {
                username: "Valjean",
                message: "In mercy's name, three days is all I need.",
                roomname: "Hello"
              }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        // TODO: MAY NEED TO JOIN TO userMsgs
        var queryString = 'INSERT INTO messages(text, dateSent, userID, roomname) \
                          values (?, (SELECT id from users WHERE username = ? limit 1), ?)';
        var queryArgs = [];

        db.Messages.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          expect(results[0].text).to.equal("In mercy's name, three days is all I need.");

          // setTimeout(done, 1000);
          done();
        });
      });
    });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
       var queryString = 'SELECT messages.msg_id, messages.text, messages.roomname from messages \
                       left outer join users on (messages.userID = users.user_id) \
                       order by messages.msg_id desc';
       var queryArgs = [{text: 'oh hai', dateSent: '2/28/14'}];

    db.Messages.query(queryString, queryArgs, function(err) { //doing nothing -> insert into messages
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].text).to.equal("Men like you can never change!"); //message table
        expect(messageLog[0].roomname).to.equal("main"); //roomMsgs -> rooms
        // setTimeout(done, 1000);
        done();
      });
    });
  });
});
