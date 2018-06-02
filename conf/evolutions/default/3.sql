#Tour SCHEMA

# --- !Ups

INSERT INTO collection (id, name, topic, description) VALUES (1, 'Englisch Woerter', 'Englisch', 'Woerter übersetzen');

INSERT INTO card (id, question, answer, fk_id) VALUES (1, 'Englisches Wort fuer Apfel?', 'Apple', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (2, 'Englisches Wort fuer Birne?', 'Pear', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (3, 'Englisches Wort fuer Auto?', 'Car', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (4, 'Englisches Wort fuer Velo?', 'Bicycle', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (5, 'Englisches Wort fuer Haus?', 'House', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (6, 'Englisches Wort fuer Fuss?', 'Foot', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (7, 'Englisches Wort fuer Kopf?', 'Head', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (8, 'Englisches Wort fuer Bild?', 'Picture', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (9, 'Englisches Wort fuer Erdbeere?', 'Strawberry', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (10, 'Englisches Wort fuer Motorrad?', 'Motorcycle', 1);

INSERT INTO collection (id, name, topic, description) VALUES (2, 'Hauptstädte', 'Geografie', 'Hauptstädte von Ländern weltweit');

INSERT INTO card (id, question, answer, fk_id) VALUES (11, 'Hauptstadt von Deutschland?', 'Berlin', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (12, 'Hauptstadt von Russland?', 'Moskau', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (13, 'Hauptstadt von Polen?', 'Warschau', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (14, 'Hauptstadt von China?', 'Peking', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (15, 'Hauptstadt von den USA?', 'Washington D.C.', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (16, 'Hauptstadt von den Vereinigten Arabischen Emiraten?', 'Dubai', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (17, 'Hauptstadt von Belgien?', 'Brüssel', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (18, 'Hauptstadt von Spanien?', 'Madrid', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (19, 'Hauptstadt von Frankreich?', 'Paris', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (20, 'Hauptstadt von Japan?', 'Tokyo', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (21, 'Hauptstadt von Australien?', 'Canberra', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (22, 'Hauptstadt von Finnland?', 'Helsinki', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (23, 'Hauptstadt von Südafrika?', 'Johannesburg', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (24, 'Hauptstadt von Ägypten?', 'Kairo', 2);
INSERT INTO card (id, question, answer, fk_id) VALUES (25, 'Hauptstadt von Island?', 'Reykjavik', 2);
# --- !Downs