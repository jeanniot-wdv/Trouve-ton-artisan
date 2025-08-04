const rateLimit = require('express-rate-limit');

// Rate limiter général
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requêtes par fenêtre
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter strict pour les formulaires de contact
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 messages de contact par fenêtre
  message: {
    success: false,
    message: 'Trop de messages envoyés, veuillez patienter avant de renvoyer un message.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Utilise l'IP et l'email pour créer une clé unique
    return `${req.ip}-${req.body.email_expediteur || 'anonymous'}`;
  }
});

// Rate limiter pour les avis
const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3, // 3 avis par heure
  message: {
    success: false,
    message: 'Trop d\'avis envoyés, veuillez patienter avant d\'envoyer un nouvel avis.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return `${req.ip}-${req.body.email_client || 'anonymous'}`;
  }
});

module.exports = {
  generalLimiter,
  contactLimiter,
  reviewLimiter
};