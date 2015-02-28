/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "ramboner",
      database: "chat"
    });
    dbConnection.connect();

    var tablenames = ['messages', 'users', 'rooms', 'roomMsgs', 'userMsgs'];

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
     dbConnection.query("truncate messages");
     dbConnection.query("truncate users");
     dbConnection.query("truncate rooms");
     dbConnection.query("truncate roomMsgs");
     dbConnection.query("truncate userMsgs", done);

     // for (var i=0; i<tablenames.length; i++) {
     //   dbConnection.query("truncate " + tablenames[i], done);
     // }
  });

  afterEach(function() {
    dbConnection.end();
  });

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
        var queryString = "SELECT * FROM messages LEFT OUTER JOIN userMsgs ON msg_id = userMsgs.msgID LEFT OUTER JOIN roomMsgs on msg_id = roomMsgs.msgID";
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
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
       var queryString = "INSERT INTO messages SET ?"; /// INSERT INTO table
       var queryArgs = [{text: 'oh hai', dateSent: '2/28/14'}]; // test message {text: 'oh hai', dateSent:
       var queryString2 = "INSERT INTO roomMsgs SET ?";
       var queryArgs2 = [{}]; // field
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) { //doing nothing -> insert into messages
      if (err) { throw err; }
      //dbConnection.query -> insert into roomMsgs
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
