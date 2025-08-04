-- Script de création de la base de données
-- Trouve ton artisan - Région Auvergne-Rhône-Alpes

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- Table des catégories
CREATE TABLE categories (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    nom_categorie VARCHAR(50) NOT NULL UNIQUE,
    slug_categorie VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des spécialités
CREATE TABLE specialites (
    id_specialite INT PRIMARY KEY AUTO_INCREMENT,
    nom_specialite VARCHAR(100) NOT NULL,
    id_categorie INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categorie) REFERENCES categories(id_categorie) ON DELETE CASCADE
);

-- Table des artisans
CREATE TABLE artisans (
    id_artisan INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telephone VARCHAR(20),
    adresse VARCHAR(255) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    departement VARCHAR(100) NOT NULL,
    id_specialite INT NOT NULL,
    description TEXT,
    site_web VARCHAR(255),
    image_url VARCHAR(255),
    note_moyenne DECIMAL(3,1) DEFAULT 0.0 CHECK (note_moyenne >= 0 AND note_moyenne <= 5),
    nombre_avis INT DEFAULT 0,
    artisan_du_mois BOOLEAN DEFAULT FALSE,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_specialite) REFERENCES specialites(id_specialite) ON DELETE RESTRICT
);

-- Table des avis (pour évolution future)
CREATE TABLE avis (
    id_avis INT PRIMARY KEY AUTO_INCREMENT,
    id_artisan INT NOT NULL,
    nom_client VARCHAR(100) NOT NULL,
    email_client VARCHAR(150) NOT NULL,
    note INT NOT NULL CHECK (note >= 1 AND note <= 5),
    commentaire TEXT,
    valide BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_artisan) REFERENCES artisans(id_artisan) ON DELETE CASCADE
);

-- Table des messages de contact
CREATE TABLE messages_contact (
    id_message INT PRIMARY KEY AUTO_INCREMENT,
    id_artisan INT NOT NULL,
    nom_expediteur VARCHAR(100) NOT NULL,
    email_expediteur VARCHAR(150) NOT NULL,
    objet VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    traite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_artisan) REFERENCES artisans(id_artisan) ON DELETE CASCADE
);

-- Création des index pour optimiser les performances
CREATE INDEX idx_specialites_categorie ON specialites(id_categorie);
CREATE INDEX idx_artisans_specialite ON artisans(id_specialite);
CREATE INDEX idx_avis_artisan ON avis(id_artisan);
CREATE INDEX idx_messages_artisan ON messages_contact(id_artisan);

-- Index pour les recherches
CREATE INDEX idx_artisans_nom ON artisans(nom);
CREATE INDEX idx_artisans_ville ON artisans(ville);
CREATE INDEX idx_artisans_departement ON artisans(departement);
CREATE INDEX idx_artisans_actif ON artisans(actif);
CREATE INDEX idx_artisans_du_mois ON artisans(artisan_du_mois);
CREATE INDEX idx_categories_slug ON categories(slug_categorie);

-- Création d'un utilisateur pour l'application (optionnel, pour la sécurité)
-- CREATE USER 'artisan_app'@'localhost' IDENTIFIED BY 'mot_de_passe_securise';
-- GRANT SELECT, INSERT, UPDATE ON trouve_ton_artisan.* TO 'artisan_app'@'localhost';
-- FLUSH PRIVILEGES;