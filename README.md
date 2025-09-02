# Trouve ton artisan | Find Your Craftsman

**Plateforme de mise en relation entre artisans et particuliers en Auvergne-Rhône-Alpes**  
**Platform connecting craftsmen and individuals in the Auvergne-Rhône-Alpes region**

![Statut du projet](https://img.shields.io/badge/statut-en%20développement-yellow)
![Project Status](https://img.shields.io/badge/status-in%20development-yellow)
![Licence](https://img.shields.io/badge/licence-MIT-blue)
![Version Node](https://img.shields.io/badge/node-v18+-green)

[🇫🇷 Français](#français) | [🇬🇧 English](#english)

[🌐 Site | Website](https://trouve-ton-artisan-jv0v.onrender.com)

---

## 🇫🇷 Français

### 📌 À propos du projet

**Trouve ton artisan** est une plateforme web développée pour la **Région Auvergne-Rhône-Alpes** qui permet aux particuliers de :

- 🔍 **Trouver** des artisans locaux près de chez eux
- 👀 **Consulter** les profils détaillés des professionnels
- 📞 **Contacter** directement les artisans via un formulaire sécurisé
- 🏠 **Localiser** les services par commune et spécialité

### 🎯 Pour qui ?

#### 👥 **Particuliers**
Vous cherchez un artisan pour vos travaux ? Cette plateforme vous aide à :
- Trouver des professionnels qualifiés dans votre région
- Comparer les spécialités et services proposés
- Contacter facilement les artisans
- Accéder à un service gratuit et sécurisé

#### 🔨 **Artisans**
Vous êtes artisan en Auvergne-Rhône-Alpes ? Bénéficiez :
- D'une visibilité accrue auprès des particuliers
- D'un référencement par spécialité et localisation
- De demandes de contact qualifiées
- D'une présence sur une plateforme régionale officielle

### 🌟 Fonctionnalités principales

- **🎨 Interface intuitive** : Navigation simple pour tous les utilisateurs
- **📱 Mobile-first** : Optimisé pour smartphones, tablettes et ordinateurs
- **♿ Accessibilité** : Conforme aux normes WCAG 2.1
- **🔒 Sécurité** : Formulaires protégés et données sécurisées
- **🌍 Intégration régionale** : Cohérent avec l'écosystème numérique régional

---

### 👨‍💻 Section Développeurs

#### 🛠 Technologies utilisées

| Catégorie | Technologies |
|-----------|--------------|
| **Front-end** | ReactJS, Bootstrap, Sass |
| **Back-end** | Node.js, Express, Sequelize |
| **Base de données** | MySQL/MariaDB |
| **Design** | Figma |
| **Outils** | Git, GitHub, Visual Studio Code |

#### 📂 Architecture du projet

```
Trouve-ton-artisan/
├── client/          # Application React (Front-end)
│   ├── src/
│   │   ├── assets/       # Styles SCSS
│   │   ├── components/   # Composants réutilisables
│   │   ├── hooks/       # Hooks personnalisés
│   │   ├── pages/       # Pages principales
│   │   └── services/    # Services API
├── server/          # API Node.js/Express (Back-end)
│   ├── config/       # Configuration base de données
│   ├── controllers/     # Contrôleurs API
│   ├── models/         # Modèles Sequelize
│   ├── repositories/   # Repositories API
│   ├── routes/         # Routes API
│   ├── middleware/     # Middlewares de sécurité
│   └── sercices/     # Services API
├── database/        # Scripts et schémas SQL
├── docs/           # Documentation technique
└── README.md       # Ce fichier
```

#### 🚀 Installation pour développeurs

##### Prérequis
- Node.js (v18+)
- MySQL/MariaDB
- Git

##### Installation rapide

```bash
# Cloner le dépôt
git clone https://github.com/jeanniot-wdv/Trouve-ton-artisan.git
cd Trouve-ton-artisan

# Configuration de la base de données
mysql -u root -p -e "CREATE DATABASE db_artisan;"
mysql -u root -p db_artisan < database/schema.sql
mysql -u root -p db_artisan < database/seeds.sql

# Installation des dépendances back-end
cd server
npm install
cp .env.example .env  # Configurer les variables d'environnement
npm run dev

# Installation des dépendances front-end (nouveau terminal)
cd ../client
npm install
npm run dev
```

##### Variables d'environnement (.env)

```env
# Base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=db_artisan

# Serveur
PORT=3001
NODE_ENV=development

# Sécurité
CORS_ORIGIN=http://localhost:3000

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### 📦 Scripts de développement

**Client (React)**
```bash
npm run dev          # Mode développement
npm run build      # Build de production
```

**Serveur (Node.js)**
```bash
npm start          # Lancement du serveur
npm run dev        # Mode développement (nodemon)
```

---

#### 🧪 Tests API

### Endpoints disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/artisans` | Liste tous les artisans |
| GET | `/api/artisans/:id` | Détails d'un artisan |
| GET | `/api/artisans/category/:categoryId` | Artisans par catégorie |
| GET | `/api/artisans/search/:query` | Recherche d'artisans |
| GET | `/api/categories` | Liste des catégories |
| GET | `/api/specialites` | Liste des spécialités |
| POST | `/api/contact` | Envoi formulaire de contact |

### Exemples de requêtes

#### 1. Récupérer tous les artisans

```bash
GET http://localhost:3001/api/artisans
```

**Réponse attendue :**
```json
{
  "success": true,
  "data": [
    {
      "id_artisan": 1,
      "nom": "Dubois Construction",
      "email": "contact@dubois-construction.fr",
      "telephone": "04 78 12 34 56",
      "ville": "Lyon",
      "note": 4.5,
      "specialite": {
        "nom_specialite": "Maçonnerie"
      }
    }
  ]
}
```

#### 2. Rechercher un artisan

```bash
GET "http://localhost:3001/api/artisans/search/plombier"
```

#### 3. Artisans par catégorie

```bash
GET http://localhost:3001/api/artisans/category/1
```

#### 4. Détails d'un artisan

```bash
GET http://localhost:3001/api/artisans/1
```

**Réponse attendue :**
```json
{
  "success": true,
  "data": {
    "id_artisan": 1,
    "nom": "Dubois Construction",
    "email": "contact@dubois-construction.fr",
    "telephone": "04 78 12 34 56",
    "adresse": "123 Rue de la République",
    "ville": "Lyon",
    "code_postal": "69001",
    "site_web": "https://dubois-construction.fr",
    "note": 4.5,
    "description": "Entreprise spécialisée en maçonnerie...",
    "image": "dubois.jpg",
    "specialite": {
      "nom_specialite": "Maçonnerie",
      "categorie": {
        "nom_categorie": "Bâtiment"
      }
    }
  }
}
```

#### 5. Envoyer un message de contact

```bash
POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Jean Dupont",
    "email": "jean.dupont@email.com",
    "objet": "Demande de devis",
    "message": "Bonjour, je souhaiterais un devis pour...",
    "id_artisan": 1
  }'
```

#### 6. Récupérer les catégories

```bash
GET http://localhost:3001/api/categories
```

#### 🔒 Sécurité implémentée

- **Rate Limiting** : Protection contre le spam
- **Validation des entrées** : express-validator
- **Protection CSRF** : Formulaires sécurisés
- **Requêtes paramétrées** : Protection contre l'injection SQL
- **CORS configuré** : Accès contrôlé à l'API

#### 🤝 Contribuer au projet

1. **Fork** le projet sur GitHub
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Suivre les conventions de code (ESLint + Prettier)
4. Écrire des tests pour les nouvelles fonctionnalités
5. **Commit** avec des messages explicites
6. **Push** et créer une Pull Request

##### Conventions de code
- **React** : Hooks fonctionnels, PropTypes
- **JavaScript** : ES6+, camelCase
- **CSS** : BEM methodology, Sass
- **Git** : Conventional commits

---

## 🇬🇧 English

### 📌 About the project

**Find Your Craftsman** is a web platform developed for the **Auvergne-Rhône-Alpes Region** that allows individuals to:

- 🔍 **Find** local craftsmen in their area
- 👀 **Browse** detailed professional profiles
- 📞 **Contact** craftsmen directly through a secure form
- 🏠 **Locate** services by municipality and specialty

### 🎯 Target users

#### 👥 **Individuals**
Looking for a craftsman for your projects? This platform helps you:
- Find qualified professionals in your region
- Compare specialties and services offered
- Easily contact craftsmen
- Access a free and secure service

#### 🔨 **Craftsmen**
Are you a craftsman in Auvergne-Rhône-Alpes? Benefit from:
- Increased visibility among individuals
- Referencing by specialty and location
- Qualified contact requests
- Presence on an official regional platform

### 🌟 Key features

- **🎨 Intuitive interface**: Simple navigation for all users
- **📱 Mobile-first**: Optimized for smartphones, tablets, and computers
- **♿ Accessibility**: WCAG 2.1 compliant
- **🔒 Security**: Protected forms and secure data
- **🌍 Regional integration**: Consistent with the regional digital ecosystem

---

### 👨‍💻 Developer Section

#### 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Front-end** | ReactJS, Bootstrap, Sass |
| **Back-end** | Node.js, Express, Sequelize |
| **Database** | MySQL/MariaDB |
| **Design** | Figma |
| **Tools** | Git, GitHub, Visual Studio Code |

#### 📂 Project Structure

```
Trouve-ton-artisan/
├── client/          # React Application (Front-end)
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/       # Main pages
│   │   ├── services/    # API services
│   │   └── styles/      # SCSS styles
├── server/          # Node.js/Express API (Back-end)
│   ├── controllers/     # API controllers
│   ├── models/         # Sequelize models
│   ├── routes/         # API routes
│   └── middleware/     # Security middleware
├── database/        # SQL scripts and schemas
│   ├── migrations/     # Migration scripts
│   └── seeds/         # Test data
├── docs/           # Technical documentation
└── README.md       # This file
```

#### 🚀 Developer Installation

##### Prerequisites
- Node.js (v18+)
- MySQL/MariaDB
- Git

##### Quick Setup

```bash
# Clone repository
git clone https://github.com/jeanniot-wdv/Trouve-ton-artisan.git
cd Trouve-ton-artisan

# Database setup
mysql -u root -p -e "CREATE DATABASE db_artisan;"
mysql -u root -p db_artisan < database/schema.sql
mysql -u root -p db_artisan < database/seeds.sql

# Backend dependencies
cd server
npm install
cp .env.example .env  # Configure environment variables
npm run dev

# Frontend dependencies (new terminal)
cd ../client
npm install
npm run dev
```

##### Environment Variables (.env)

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=db_artisan

# Server
PORT=3001
NODE_ENV=development

# Security
CORS_ORIGIN=http://localhost:3000

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### 📦 Development Scripts

**Client (React)**
```bash
npm run dev          # Development mode
npm run build      # Production build
```

**Server (Node.js)**
```bash
npm start          # Start server
npm run dev        # Development mode (nodemon)
```

#### 🔒 Security Implementation

- **Rate Limiting**: Spam protection
- **Input Validation**: express-validator
- **CSRF Protection**: Secure forms
- **Parameterized Queries**: SQL injection protection
- **CORS Configuration**: Controlled API access

#### 🤝 Contributing

1. **Fork** the project on GitHub
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Follow code conventions (ESLint + Prettier)
4. Write tests for new features
5. **Commit** with explicit messages
6. **Push** and create a Pull Request

##### Code Conventions
- **React**: Functional hooks, PropTypes
- **JavaScript**: ES6+, camelCase
- **CSS**: BEM methodology, Sass
- **Git**: Conventional commits

---

## 📞 Contact | Support

**Développeur | Developer**: Romain Jeanniot - [romain.jeanniot@example.com](mailto:romain.jeanniot@example.com)  
**Client**: Région Auvergne-Rhône-Alpes - [contact@auvergnerhonealpes.fr](mailto:contact@auvergnerhonealpes.fr)

---

<div align="center">

**Développé pour la Région Auvergne-Rhône-Alpes**  
**Developed for the Auvergne-Rhône-Alpes Region**

[🌐 Site officiel | Official Website](https://www.auvergnerhonealpes.fr) • [📧 Contact](mailto:contact@auvergnerhonealpes.fr)

</div>