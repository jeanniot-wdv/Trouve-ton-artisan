const express = require('express');
const router = express.Router();
const {
  sendContactMessage,
  getMessagesByArtisan
} = require('../controllers/contactController');
const { validateId, validateContactMessage } = require('../middleware/validation');
const { contactLimiter } = require('../middleware/rateLimiter');


/**
 * @route   GET /api/contact/artisan/:id
 * @desc    Récupérer les messages de contact d'un artisan (admin)
 * @access  Public (à protéger en production)
 * @query   ?page=1&limit=10&traite=false
 */
router.get('/artisan/:id', validateId, getMessagesByArtisan);

/**
 * @route   POST /api/contact/artisan/:id
 * @desc    Envoyer un message de contact à un artisan
 * @access  Public
 * @body    { nom_expediteur, email_expediteur, objet, message }
 */
router.post('/artisan/:id', 
  contactLimiter,
  validateId, 
  validateContactMessage, 
  sendContactMessage
);

module.exports = router;