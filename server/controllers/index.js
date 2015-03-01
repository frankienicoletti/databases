var models = require('../models');
var bluebird = require('bluebird');
var db = require('../db');


module.exports = {
  messages: {
    get: function (req, res) {
      db.Messages.findAll({include: [db.Users]})
        .complete(function(err, results){
          if(err){
            throw err;
          }
          res.json(results);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // need to pass in object of fields to update
      db.Users.findOrCreate({username: req.body[username]})
        .complete(function(err, results){
          if(err){
            throw err;
          }
          var params = {
            text: req.body[text],
            userId: userId,
            roomname: req.body[roomname]
          };
          db.Messages.create(params)
            .complete(function(err, results){
              if(err){
                throw err;
              }
              res.sendStatus(201);
            });
        });
    }
  }, // a function which handles posting a message to the database

  users: {
    // Ditto as above
    get: function (req, res) {
      db.Users.findAll()
      .complete(function(err, results){
        if(err){
          throw err;
        }
        res.json(results);
      });
    },
    post: function (req, res) {
      // need to pass in object of fields to update
      db.Users.create({username: req.body[username]})
        .complete(function(err, results){
          if(err){
            throw err;
          }
          res.sendStatus(201);
        });
    }
  }
};
