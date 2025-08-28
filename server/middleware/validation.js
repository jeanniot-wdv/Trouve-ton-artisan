const { body, param, query, validationResult } = require('express-validator');

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors: errors.array()
    });
  }
  next();
};

// Validation pour les messages de contact
const validateContactMessage = [
  body('nom_expediteur')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
  
  body('email_expediteur')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email invalide'),
  
  body('objet')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('L\'objet doit contenir entre 5 et 200 caractères'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Le message doit contenir entre 10 et 2000 caractères'),
  
  handleValidationErrors
];

// Validation des paramètres d'ID
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID invalide'),
  
  handleValidationErrors
];

// Validation des paramètres de recherche
const validateSearchParams = [
  query('ville')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom de ville doit contenir entre 2 et 100 caractères'),
  
  query('departement')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom du département doit contenir entre 2 et 100 caractères'),
  
  query('specialite')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de spécialité invalide'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Le numéro de page doit être un nombre positif'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('La limite doit être un nombre entre 1 et 50'),
  
  handleValidationErrors
];

module.exports = {
  validateContactMessage,
  validateId,
  validateSearchParams,
  handleValidationErrors
};