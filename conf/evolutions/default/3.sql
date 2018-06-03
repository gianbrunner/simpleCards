#Tour SCHEMA

# --- !Ups

INSERT INTO collection (id, name, topic, description) VALUES (1, 'Englisch Wörter', 'Englisch', 'Wörter übersetzen');

INSERT INTO card (id, question, answer, fk_id) VALUES (1, 'Englisches Wort für Apfel?', 'Apple', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (2, 'Englisches Wort für Birne?', 'Pear', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (3, 'Englisches Wort für Auto?', 'Car', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (4, 'Englisches Wort für Velo?', 'Bicycle', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (5, 'Englisches Wort für Haus?', 'House', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (6, 'Englisches Wort für Fuss?', 'Foot', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (7, 'Englisches Wort für Kopf?', 'Head', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (8, 'Englisches Wort für Bild?', 'Picture', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (9, 'Englisches Wort für Erdbeere?', 'Strawberry', 1);
INSERT INTO card (id, question, answer, fk_id) VALUES (10, 'Englisches Wort für Motorrad?', 'Motorcycle', 1);

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

INSERT INTO collection (id, name, topic, description) VALUES (3, 'Kleines 1x1', 'Mathematik', 'Zahlenreihen von 1-10');

INSERT INTO card (id, question, answer, fk_id) VALUES (26, '3x3?', '9', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (27, '2x8?', '16', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (28, '10x4?', '40', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (29, '8x6?', '48', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (30, '7x7?', '49', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (31, '4x6?', '24', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (32, '8x3?', '24', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (33, '9x7?', '63', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (34, '5x5?', '25', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (35, '1x7?', '7', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (36, '8x8?', '64', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (37, '10x9?', '90', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (38, '3x5?', '15', 3);
INSERT INTO card (id, question, answer, fk_id) VALUES (39, '7x7?', '56', 3);
# --- !Downs