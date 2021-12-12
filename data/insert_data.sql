BEGIN;
-- Déchargement des données de la table "role" et "thematic"
--

INSERT INTO "role" ("role") VALUES
('user'),
('teacher'),
('admin');

INSERT INTO "thematic" ("category") VALUES
('SQL'),
('JAVASCRIPT'),
('NODEJS'),
('HTML'),
('CSS');

COMMIT;