USE chat;

ALTER TABLE messages (
  userId INT NOT NULL,
  roomname varchar(20)
);






/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

