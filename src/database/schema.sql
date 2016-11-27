DROP TABLE if EXISTS users;

CREATE TABLE users (
  id integer PRIMARY KEY autoincrement,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL
);

DROP TABLE if EXISTS favorites;

CREATE TABLE favorites (
  id integer PRIMARY KEY autoincrement,
  user_id varchar(100) NOT NULL,
  location varchar(100) NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
