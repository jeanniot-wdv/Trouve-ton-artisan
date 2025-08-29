// Au début de server.js
const path = require('path');

// Chargement conditionnel des variables d'environnement
if (process.env.NODE_ENV === 'production') {
  // En production, Render fournit les variables directement
  console.log('🌍 Mode production - Variables depuis Render');
} else {
  // En développement, charge .env.dev
  require('dotenv').config({ path: path.join(__dirname, '.env.dev') });
  console.log('🏠 Mode développement - Variables depuis .env.dev');
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Import des modules
const { testConnection } = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');

// Import des routes
const categoriesRouter = require('./routes/categories');
const artisansRouter = require('./routes/artisans');
const contactRouter = require('./routes/contact');

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de sécurité
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Configuration CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use(generalLimiter);

// Middleware de logging simple
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Trouve ton artisan opérationnelle',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API Trouve ton artisan - Région Auvergne-Rhône-Alpes',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categories',
      artisans: '/api/artisans',
      contact: '/api/contact'
    }
  });
});

// Routes de l'API
app.use('/api/categories', categoriesRouter);
app.use('/api/artisans', artisansRouter);
app.use('/api/contact', contactRouter);

// Middleware pour les erreurs
app.use(notFound);
app.use(errorHandler);

// Démarrage du serveur
const startServer = async () => {
  try {
    console.log('🔄 Démarrage du serveur...');
    
    // Test connexion base de données
    await testConnection();
    console.log('✅ Connexion base de données établie');
    
    // Sync modèles en développement
    if (process.env.NODE_ENV === 'development') {
      const { syncDatabase } = require('./models');
      await syncDatabase(false);
      console.log('✅ Modèles synchronisés');
    }
    
    // Lancement du serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
      console.log(`📚 API: http://localhost:${PORT}/api`);
      console.log(`💓 Health: http://localhost:${PORT}/health`);
      console.log('Ctrl+C pour arrêter');
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

// Arrêt propre du serveur
process.on('SIGINT', () => {
  console.log('\n📴 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n📴 Arrêt du serveur...');
  process.exit(0);
});

// Démarrage
startServer();

module.exports = app;