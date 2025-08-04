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
const reviewsRouter = require('./routes/reviews');
const contactRouter = require('./routes/contact');

// Initialisation de l'application
const app = express();

// Configuration du port
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
  credentials: true,
  optionsSuccessStatus: 200
}));

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use(generalLimiter);

// Middleware de logging en développement
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Trouve ton artisan opérationnelle',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Route d'accueil de l'API
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API Trouve ton artisan - Région Auvergne-Rhône-Alpes',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categories',
      artisans: '/api/artisans',
      reviews: '/api/reviews',
      contact: '/api/contact'
    },
    documentation: 'Consultez le README.md pour la documentation complète'
  });
});

// Routes de l'API
app.use('/api/categories', categoriesRouter);
app.use('/api/artisans', artisansRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/contact', contactRouter);

// Middleware pour les routes non trouvées
app.use(notFound);

// Middleware de gestion d'erreurs global
app.use(errorHandler);

// Fonction de démarrage du serveur
const startServer = async () => {
  try {
    // Test de la connexion à la base de données
    await testConnection();
    
    // Synchronisation des modèles (en développement seulement)
    if (process.env.NODE_ENV === 'development') {
      const { syncDatabase } = require('./models');
      await syncDatabase(false); // false = ne pas supprimer les données existantes
    }
    
    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`
🚀 Serveur démarré avec succès !
📍 Port: ${PORT}
🌍 Environnement: ${process.env.NODE_ENV || 'development'}
🔗 URL locale: http://localhost:${PORT}
📚 Documentation API: http://localhost:${PORT}/api
💓 Health check: http://localhost:${PORT}/health
      `);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Gestion propre de l'arrêt du serveur
process.on('SIGTERM', () => {
  console.log('📴 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 Arrêt du serveur...');
  process.exit(0);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Promesse non gérée:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('🚨 Exception non capturée:', error);
  process.exit(1);
});

// Démarrage du serveur
startServer();

module.exports = app;