var controllers = require('./controllers');
var router = require('express').Router();

// assigning the controls in controller to each route in the Router
for (var route in controllers) {
  router.route("/" + route)
    // /messages
    // /users
    .get(controllers[route].get)
    .post(controllers[route].post);
}


module.exports = router;

