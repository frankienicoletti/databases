var Sequelize = require('sequelize');
var orm = new Sequelize('chat', 'root', 'ramboner', {
  host: 'localhost',
  port: '3000',

  dialect: 'mysql'  // <--- that's the only other thing I saw
});
//var sequelize = new Sequelize('mysql://127.0.0.1:3306/chatterbox', {});

var Users = orm.define('users', {username: Sequelize.STRING});

var Messages = orm.define('messages', {text: Sequelize.STRING, dateSent: Sequelize.STRING});

Users.hasMany(Messages);
Messages.belongsTo(Users);

Users.sync();
Messages.sync();

exports.Users = Users;
exports.Messages = Messages;


