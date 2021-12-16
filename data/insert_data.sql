BEGIN;

INSERT INTO "role" ("role") VALUES
('user'),
('teacher'),
('admin');

INSERT INTO "user"("login","email","password","role_id") VALUES
('aviateur22','aviateur22@hotmail.fr','$2b$10$x7U3SPvoeNVTKpLEBTC7UuXmn1BDg9AbeHjqDifDJ7efiTzjEMzq2','2'),
('aviateur22','aviateur22@gmail.com','$2b$10$x7U3SPvoeNVTKpLEBTC7UuXmn1BDg9AbeHjqDifDJ7efiTzjEMzq2','3');

INSERT INTO "thematic" ("category","image_path") VALUES
('base de données','/images/database.png'),
('javascript','/images/javascript.png'),
('NODEJS','/images/nodejs.png'),
('HTML','/images/html.png'),
('CSS','/images/css.png');

INSERT INTO "sub_category" ("name","thematic_id") VALUES
('postgresql','1'),
('mysql','1'),
('sqlserver','1'),
('mongodb','1'),
('orm','1'),
('jquery','2'),
('poo','2'),
('express','3'),
('ejs','3');

COMMIT;