USE chat;

CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(20)
);

CREATE TABLE messages (
 msg_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 text varchar(140),
 dateSent DATETIME
);

CREATE TABLE rooms (
  room_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  roomname varchar(20)
);

CREATE TABLE roomMsgs (
  rmMsg_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  roomID INT,
  msgID INT
);

CREATE TABLE userMsgs (
  userMsgs_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userID INT,
  msgID INT
);





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

