#Tour SCHEMA

# --- !Ups

CREATE TABLE collection (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name VARCHAR (255),
  topic VARCHAR (255),
  description VARCHAR (255),
  PRIMARY KEY (id)
);

# --- !Downs

DROP TABLE collection;