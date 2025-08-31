-- Script d'alimentation de la base de données
-- Trouve ton artisan - Région Auvergne-Rhône-Alpes


USE db_artisan;

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

-- Insertion des artisans
INSERT INTO artisans (
    nom, email, telephone, adresse, ville, code_postal, departement, 
    id_specialite, description, site_web, image_url, note_moyenne, 
    nombre_avis, artisan_du_mois, actif
) VALUES
-- Alimentation
('Boucherie Dumont', 'boucherie.dumont@gmail.com', '04.78.XX.XX.XX', 'Adresse à compléter', 'Lyon', '69000', 'Rhône', 12, 
'Spécialisée dans les viandes locales et les produits tripiers lyonnais, la Boucherie Dumont vous propose une sélection de bœuf Charolais, de porc fermier et de volailles élevées en plein air. Découpe sur mesure et conseils avisés.', 
NULL, '/images/profil1.jpg', 4.5, 45, FALSE, TRUE),

('Au pain chaud', 'aupainchaud@hotmail.com', '04.75.XX.XX.XX', 'Adresse à compléter', 'Montélimar', '26200', 'Drôme', 13, 
'Artisan boulanger depuis 1985, nous pétrissons chaque jour des pains traditionnels, des croissants feuilletés et la célèbre pogne de Montélimar. Farines bio et levain naturel pour des saveurs authentiques.', 
NULL, '/images/profil2.jpg', 4.8, 78, TRUE, TRUE),

('Chocolaterie Labbé', 'chocolaterie-labbe@gmail.com', '04.78.XX.XX.XX', 'Adresse à compléter', 'Lyon', '69000', 'Rhône', 14, 
'Découvrez nos ganaches onctueuses, pralinés croquants et tablettes artisanales, fabriquées à partir de fèves de cacao d\'origine équitable. Spécialité : les quenchons lyonnais et les mendiants aux fruits secs.', 
'https://chocolaterie-labbe.fr', '/images/profil3.jpg', 4.9, 92, TRUE, TRUE),

('Traiteur Truchon', 'contact@truchon-traiteur.fr', '04.78.XX.XX.XX', 'Adresse à compléter', 'Lyon', '69000', 'Rhône', 15, 
'Traiteur lyonnais réputé pour ses plats traditionnels revisités : quenelles sauce Nantua, salades gourmandes et buffets sur mesure pour vos événements. Livraison possible dans tout le Grand Lyon.', 
'https://truchon-traiteur.fr', '/images/profil4.jpg', 4.1, 34, FALSE, TRUE),

-- Bâtiment
('Orville Salmons', 'o-salmons@live.com', '04.50.XX.XX.XX', 'Adresse à compléter', 'Evian', '74500', 'Haute-Savoie', 4, 
'Expert en installation et maintenance de chaudières, pompes à chaleur et systèmes solaires thermiques. Interventions rapides et garantie décennale pour votre confort thermique.', 
NULL, '/images/profil8.jpg', 5.0, 67, TRUE, TRUE),

('Mont Blanc Électricité', 'contact@mont-blanc-electricite.com', '04.50.XX.XX.XX', 'Adresse à compléter', 'Chamonix', '74400', 'Haute-Savoie', 2, 
'Spécialistes des installations électriques en haute montagne : chauffage électrique, mise aux normes et dépannage 24/7. Devis gratuits et conseils en économie d\'énergie.', 
'https://mont-blanc-electricite.com', '/images/profil4.jpg', 4.5, 56, FALSE, TRUE),

('Boutot & fils', 'boutot-menuiserie@gmail.com', '04.74.XX.XX.XX', 'Adresse à compléter', 'Bourg-en-bresse', '01000', 'Ain', 3, 
'Menuiserie sur mesure en bois massif : fenêtres, portes, escaliers et agencements intérieurs. Travail artisanal et respect des essences locales (chêne, noyer).', 
'https://boutot-menuiserie.com', '/images/profil6.jpg', 4.7, 89, FALSE, TRUE),

('Vallis Bellemare', 'v.bellemare@gmail.com', '04.74.XX.XX.XX', 'Adresse à compléter', 'Vienne', '38200', 'Isère', 1, 
'Dépannage, installation et rénovation de salles de bain. Expertise en robinetterie thermostatique et en traitement de l\'eau pour préserver vos canalisations. Devis transparent et sans surprise.', 
'https://plomberie-bellemare.com', '/images/profil7.jpg', 4.0, 43, TRUE, TRUE),

-- Fabrication
('Claude Quinn', 'claude.quinn@gmail.com', '04.79.XX.XX.XX', 'Adresse à compléter', 'Aix-les-bains', '73100', 'Savoie', 9, 
'Création et réparation de bijoux en or, argent et platine. Spécialiste des alliances sur mesure et des pierres fines. Nettoyage gratuit de vos bijoux en boutique.', 
NULL, '/images/profil8.jpg', 4.2, 23, FALSE, TRUE),

('Amitee Lécuyer', 'a.amitee@hotmail.com', '04.50.XX.XX.XX', 'Adresse à compléter', 'Annecy', '74000', 'Haute-Savoie', 10, 
'Couture sur mesure pour femmes et hommes : robes de soirée, costumes et retouches. Tissus haut de gamme et finitions soignées. Atelier ouvert sur rendez-vous.', 
'https://lecuyer-couture.com', '/images/profil5.jpg', 4.5, 67, FALSE, TRUE),

('Ernest Carignan', 'e-carigan@hotmail.com', '04.71.XX.XX.XX', 'Adresse à compléter', 'Le Puy-en-Velay', '43000', 'Haute-Loire', 11, 
'Forge traditionnelle et création d\'objets en fer forgé : rampes d\'escalier, portes, mobilier d\'extérieur et décorations uniques. Travail à l\'ancienne avec des matériaux durables.', 
NULL, '/images/profil1.jpg', 5.0, 34, FALSE, TRUE),

-- Services
('Royden Charbonneau', 'r.charbonneau@gmail.com', '04.78.XX.XX.XX', 'Adresse à compléter', 'Saint-Priest', '69800', 'Rhône', 5, 
'Salon mixte proposant coupes tendances, colorations végétales et soins capillaires bio. Ambiance conviviale et conseils personnalisés pour sublimer vos cheveux au quotidien.', 
NULL, '/images/profil2.jpg', 3.8, 12, FALSE, TRUE),

('Leala Dennis', 'l.dennis@hotmail.fr', '04.79.XX.XX.XX', 'Adresse à compléter', 'Chambéry', '73000', 'Savoie', 5, 
'Coiffure créative et soins du cuir chevelu dans un cadre chaleureux. Spécialisée dans les coupes déstructurées et les balayages naturels. Produits sans sulfates ni parabènes.', 
'https://coiffure-leala-chambery.fr', '/images/profil3.jpg', 3.8, 18, FALSE, TRUE),

('C\'est sup\'hair', 'sup-hair@gmail.com', '04.75.XX.XX.XX', 'Adresse à compléter', 'Romans-sur-Isère', '26100', 'Drôme', 5, 
'Salon engagé dans la coiffure éthique : coupes unisexes, colorations respectueuses de l\'environnement et revalorisation des cheveux longs pour des perruques solidaires.', 
'https://sup-hair.fr', '/images/profil5.jpg', 4.1, 25, FALSE, TRUE),

('Le monde des fleurs', 'contact@le-monde-des-fleurs-annonay.fr', '04.75.XX.XX.XX', 'Adresse à compléter', 'Annonay', '07100', 'Ardèche', 6, 
'Compositions florales originales pour toutes les occasions : bouquets de saison, mariages et décoration d\'événements. Livraison de fleurs fraîches dans un rayon de 20 km.', 
'https://le-monde-des-fleurs-annonay.fr', '/images/profil4.jpg', 4.6, 78, FALSE, TRUE),

('Valérie Laderoute', 'v-laredoute@gmail.com', '04.75.XX.XX.XX', 'Adresse à compléter', 'Valence', '26000', 'Drôme', 7, 
'Toilettage doux et respectueux pour chiens et chats, avec produits hypoallergéniques. Spécialiste des races à poils longs et des soins anti-parasitaires naturels.', 
NULL, '/images/profil6.jpg', 4.5, 34, FALSE, TRUE),

('CM Graphisme', 'contact@cm-graphisme.com', '04.75.XX.XX.XX', 'Adresse à compléter', 'Valence', '26000', 'Drôme', 8, 
'Création de sites web sur mesure, identités visuelles et supports print. Approche centrée sur l\'utilisateur et optimisation SEO pour booster votre visibilité en ligne.', 
'https://cm-graphisme.com', '/images/profil7.jpg', 4.4, 56, FALSE, TRUE);

-- Insertion des messages de contact (données existantes)
INSERT INTO messages_contact (id_artisan, nom_expediteur, email_expediteur, objet, message, traite) VALUES
(1, 'Laurent Bernard', 'l.bernard@email.fr', 'Devis rénovation maison', 'Bonjour, je souhaiterais un devis pour la rénovation complète de ma cuisine. Pourriez-vous me contacter ? Merci.', FALSE),
(2, 'Isabelle Petit', 'i.petit@email.fr', 'Commande vases personnalisés', 'Bonjour, je recherche 6 vases assortis pour ma terrasse. Pouvez-vous réaliser du sur-mesure ?', FALSE),
(4, 'Michel Roux', 'm.roux@email.fr', 'Urgence fuite cuisine', 'Bonjour, j\'ai une fuite importante sous mon évier. Pouvez-vous intervenir rapidement ? Merci.', TRUE),
(6, 'John Doe', 'jeanniotrn@gmail.com', 'Devis', 'Devis test essai', FALSE),
(2, 'John Doe', 'jeanniotrn@gmail.com', 'Devis', 'J\'ai besoin d\'un devis', FALSE),
(7, 'John Doe', 'jeanniotrn@gmail.com', 'Devis', 'Besoin d\'un devis', FALSE);