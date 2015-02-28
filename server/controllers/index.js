var models = require('../models');
var bluebird = require('bluebird');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var collectData = function(request, callback) {
  var data = "";
  request.on('data', function(chunk) {
    data+=chunk;
  });
  request.on('end', function() {
    callback(JSON.parse(data));
  });
};


module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get();
      sendResponse(res);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // need to pass in object of fields to update
      models.messages.post(req.body, function(data){
        res.send(data);
      })
      collectData(req, function(data){


        // messages obj = {text: '', createdAt: ''}
        // username obj = {username: ''}
        // room obj = {roomname: ''}
        models.messages.post(message);
        sendResponse(res);
      })
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get();
      sendResponse(res);
    },
    post: function (req, res) {
      // need to pass in object of fields to update
      collectData(req, function(username){
        models.users.post(username);
        sendResponse(res);
      });
    }
  }
};

//exports.sendResponse = function(response, data, statusCode) {
//  statusCode = statusCode || 200;
//  response.writeHead(statusCode, headers);
//  response.end(JSON.stringify(data));
//};

// REQUEST-HANDLER
//var actions = {
//  'GET': function(request, response) {
//    utils.sendResponse(response, data);
//  },
//  'POST': function(request, response) {
//    utils.collectData(request, function(message) {
//      message.objectId = ++objectId;
//      data.results.push(message);
//      console.log("MESSAGE:", message);
//      utils.sendResponse(response, {objectId: objectId});
//    });
//  },
//  'OPTIONS': function(request, response) {
//    utils.sendResponse(response, null);
//  }
//};

//module.exports = function(request, response) {
//  console.log("Serving request type " + request.method + " for url " + request.url);
//  var action = actions[request.method];
//  if (action) {
//    action(request, response);
//  } else {
//    utils.sendResponse(response, 'NOT FOUND', 404);
//  }

// UTILS

//exports.sendResponse = function(response, data, statusCode) {
//  statusCode = statusCode || 200;
//  response.writeHead(statusCode, headers);
//  response.end(JSON.stringify(data));
//};
//
//exports.collectData = function(request, callback) {
//  var data = "";
//  request.on('data', function(chunk) {
//    data+=chunk;
//  });
//  request.on('end', function() {
//    callback(JSON.parse(data));
//  });
//};
