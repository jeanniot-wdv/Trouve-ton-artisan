// Middleware de gestion d'erreurs global
const errorHandler = (err, req, res, next) => {
  console.error('🚨 Erreur:', err);

  // Erreur de validation Sequelize
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors
    });
  }

  // Erreur de contrainte unique Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'Cette valeur existe déjà',
      field: err.errors[0]?.path
    });
  }

  // Erreur de clé étrangère Sequelize
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Référence invalide'
    });
  }

  // Erreur de connexion à la base de données
  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      success: false,
      message: 'Service temporairement indisponible'
    });
  }

  // Erreur JSON malformé
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Format JSON invalide'
    });
  }

  // Erreur 404 personnalisée
  if (err.status === 404) {
    return res.status(404).json({
      success: false,
      message: err.message || 'Ressource non trouvée'
    });
  }

  // Erreur générique
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Une erreur interne s\'est produite' 
    : err.message;

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Middleware pour les routes non trouvées
const notFound = (req, res, next) => {
  const error = new Error(`Route non trouvée - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

module.exports = { errorHandler, notFound };