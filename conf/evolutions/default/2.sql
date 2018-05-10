#Tour SCHEMA

# --- !Ups

create table collection (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  title varchar(255),
  PRIMARY KEY (id)
);

# --- !Downs

drop table collection;