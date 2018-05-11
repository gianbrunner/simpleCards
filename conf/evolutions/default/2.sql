#Tour SCHEMA

# --- !Ups

CREATE TABLE card (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  question VARCHAR (255),
  answer VARCHAR (255),
  fk_id bigint(20) NOT NULL,
  FOREIGN KEY (fk_id) references collection(id),
  PRIMARY KEY (id)
);

# --- !Downs

DROP TABLE card;