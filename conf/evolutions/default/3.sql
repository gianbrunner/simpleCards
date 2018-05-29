#Tour SCHEMA

# --- !Ups

INSERT INTO collection (id, name, topic, description) VALUES (1, 'Englisch Woerter', 'Englisch', 'Woerter übersetzen');

INSERT INTO card (id, question, answer, fk_id) VALUES (1, 'Englisches Wort fuer Apfel?', 'apple', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (2, 'Englisches Wort fuer Birne?', 'pear', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (3, 'Englisches Wort fuer Auto?', 'car', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (4, 'Englisches Wort fuer Velo?', 'bicycle', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (5, 'Englisches Wort fuer Haus?', 'house', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (6, 'Englisches Wort fuer Fuss?', 'foot', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (7, 'Englisches Wort fuer Kopf?', 'head', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (8, 'Englisches Wort fuer Bild?', 'picture', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (9, 'Englisches Wort fuer Erdbeere?', 'strawberry', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (10, 'Englisches Wort fuer Motorrad?', 'motorcycle', 1);

# --- !Downs