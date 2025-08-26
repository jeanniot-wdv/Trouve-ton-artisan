-- Script d'alimentation de la base de données
-- Trouve ton artisan - Région Auvergne-Rhône-Alpes

USE trouve_ton_artisan;

-- Insertion des catégories
INSERT INTO categories (nom_categorie, slug_categorie, description) VALUES
('Bâtiment', 'batiment', 'Artisans spécialisés dans la construction, la rénovation et l\'entretien du bâtiment'),
('Services', 'services', 'Artisans proposant des services à la personne et aux entreprises'),
('Fabrication', 'fabrication', 'Artisans créateurs et fabricants d\'objets artisanaux'),
('Alimentation', 'alimentation', 'Artisans des métiers de bouche et de l\'alimentation');

-- Insertion des spécialités
INSERT INTO specialites (nom_specialite, id_categorie, description) VALUES
-- Bâtiment (id_categorie = 1)
('Plombier', 1, 'Installation et réparation de plomberie'),
('Electricien', 1, 'Installation électrique et dépannage'),
('Menuisier', 1, 'Fabrication et pose de menuiseries'),
('Chauffagiste', 1, 'Installation et maintenance de systèmes de chauffage'),

-- Services (id_categorie = 2)
('Coiffeur', 2, 'Services de coiffure professionnels'),
('Fleuriste', 2, 'Création florale et décoration'),
('Toiletteur', 2, 'Soins et toilettage d\'animaux'),
('Webdesign', 2, 'Création de sites web et graphisme'),

-- Fabrication (id_categorie = 3)
('Bijoutier', 3, 'Création et réparation de bijoux'),
('Couturier', 3, 'Création et retouche de vêtements'),
('Ferronier', 3, 'Travail du fer et ferronnerie d\'art'),

-- Alimentation (id_categorie = 4)
('Boucher', 4, 'Viandes et charcuterie'),
('Boulanger', 4, 'Pain et viennoiseries artisanales'),
('Chocolatier', 4, 'Chocolats et confiseries artisanales'),
('Traiteur', 4, 'Services de restauration et événementiel');

-- Insertion des artisans avec les données fournies
INSERT INTO artisans (
    nom, email, telephone, adresse, ville, code_postal, departement, 
    id_specialite, description, site_web, image_url, note_moyenne, 
    nombre_avis, artisan_du_mois, actif
) VALUES
-- Alimentation
('Boucherie Dumont', 'boucherie.dumond@gmail.com', '04.78.XX.XX.XX', 'Adresse à compléter', 'Lyon', '69000', 'Rhône', 12, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
NULL, '/images/artisans/boucherie-dumont.jpg', 4.5, 45, FALSE, TRUE),

('Au pain chaud', 'aupainchaud@hotmail.com', '04.75.XX.XX.XX', 'Adresse à compléter', 'Montélimar', '26200', 'Drôme', 13, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
NULL, '/images/artisans/au-pain-chaud.jpg', 4.8, 78, TRUE, TRUE),

('Chocolaterie Labbé', 'chocolaterie-labbe@gmail.com', '04.78.XX.XX.XX', 'Adresse à compléter', 'Lyon', '69000', 'Rhône', 14, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'https://chocolaterie-labbe.fr', '/images/artisans/chocolaterie-labbe.jpg', 4.9, 92, TRUE, TRUE),

('Traiteur Truchon', 'contact@truchon-traiteur.fr', '04.78.XX.XX.XX', 'Adresse à compléter', 'Lyon', '69000', 'Rhône', 15, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'https://truchon-traiteur.fr', '/images/artisans/traiteur-truchon.jpg', 4.1, 34, FALSE, TRUE),

-- Bâtiment
('Orville Salmons', 'o-salmons@live.com', '04.50.XX.XX.XX', 'Adresse à compléter', 'Evian', '74500', 'Haute-Savoie', 4, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
NULL, '/images/artisans/orville-salmons.jpg', 5.0, 67, TRUE, TRUE),

('Mont Blanc Eléctricité', 'contact@mont-blanc-electricite.com', '04.50.XX.XX.XX', 'Adresse à compléter', 'Chamonix', '74400', 'Haute-Savoie', 2, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'https://mont-blanc-electricite.com', '/images/artisans/mont-blanc-electricite.jpg', 4.5, 56, FALSE, TRUE),

('Boutot & fils', 'boutot-menuiserie@gmail.com', '04.74.XX.XX.XX', 'Adresse à compléter', 'Bourg-en-bresse', '01000', 'Ain', 3, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'https://boutot-menuiserie.com', '/images/artisans/boutot-menuiserie.jpg', 4.7, 89, FALSE, TRUE),

('Vallis Bellemare', 'v.bellemare@gmail.com', '04.74.XX.XX.XX', 'Adresse à compléter', 'Vienne', '38200', 'Isère', 1, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'https://plomberie-bellemare.com', '/images/artisans/plomberie-bellemare.jpg', 4.0, 43, FALSE, TRUE),

-- Fabrication
('Claude Quinn', 'claude.quinn@gmail.com', '04.79.XX.XX.XX', 'Adresse à compléter', 'Aix-les-bains', '73100', 'Savoie', 9, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
NULL, '/images/artisans/claude-quinn.jpg', 4.2, 23, FALSE, TRUE),

('Amitee Lécuyer', 'a.amitee@hotmail.com', '04.50.XX.XX.XX', 'Adresse à compléter', 'Annecy', '74000', 'Haute-Savoie', 10, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'https://lecuyer-couture.com', '/images/artisans/lecuyer-couture.jpg', 4.5, 67, FALSE, TRUE),

('Ernest Carignan', 'e-carigan@hotmail.com', '04.71.XX.XX.XX', 'Adresse à compléter', 'Le Puy-en-Velay', '43000', 'Haute-Loire', 11, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
NULL, '/images/artisans/ernest-carignan.jpg', 5.0, 34, FALSE, TRUE),

-- Services
('Royden Charbonneau', 'r.charbonneau@gmail.com', '04.78.XX.XX.XX', 'Adresse à compléter', 'Saint-Priest', '69800', 'Rhône', 5, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
NULL, '/images/artisans/royden-charbonneau.jpg', 3.8, 12, FALSE, TRUE),

('Leala Dennis', 'l.dennos@hotmail.fr', '04.79.XX.XX.XX', 'Adresse à compléter', 'Chambéry', '73000', 'Savoie', 5, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'https://coiffure-leala-chambery.fr', '/images/artisans/coiffure-leala.jpg', 3.8, 18, FALSE, TRUE),

('C\'est sup\'hair', 'sup-hair@gmail.com', '04.75.XX.XX.XX', 'Adresse à compléter', 'Romans-sur-Isère', '26100', 'Drôme', 5, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'https://sup-hair.fr', '/images/artisans/sup-hair.jpg', 4.1, 25, FALSE, TRUE),

('Le monde des fleurs', 'contact@le-monde-des-fleurs-annonay.fr', '04.75.XX.XX.XX', 'Adresse à compléter', 'Annonay', '07100', 'Ardèche', 6, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'https://le-monde-des-fleurs-annonay.fr', '/images/artisans/monde-des-fleurs.jpg', 4.6, 78, FALSE, TRUE),

('Valérie Laderoute', 'v-laredoute@gmail.com', '04.75.XX.XX.XX', 'Adresse à compléter', 'Valence', '26000', 'Drôme', 7, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
NULL, '/images/artisans/valerie-laderoute.jpg', 4.5, 34, FALSE, TRUE),

('CM Graphisme', 'contact@cm-graphisme.com', '04.75.XX.XX.XX', 'Adresse à compléter', 'Valence', '26000', 'Drôme', 8, 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
'https://cm-graphisme.com', '/images/artisans/cm-graphisme.jpg', 4.4, 56, FALSE, TRUE);
