DROP DATABASE IF EXISTS got;
CREATE DATABASE got;

\c got;

CREATE TABLE gotCharacter (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  family VARCHAR,
  age INTEGER,
  sex VARCHAR
);

INSERT INTO gotCharacter (name, family, age, sex)
  VALUES ('John Snow', 'Stark', 28, 'M');