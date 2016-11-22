DROP TABLE if EXISTS users;

CREATE TABLE users (
  id integer PRIMARY KEY autoincrement,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  tpassword varchar(100) NOT NULL,
  password varchar(100) NOT NULL
)
