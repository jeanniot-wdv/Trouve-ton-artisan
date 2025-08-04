const express = require('express');
const router = express.Router();
const {
  sendContactMessage,
  getMessagesByArtisan,
  getRecentMessages,
  markMessageAsProcessed,
  getContactStats
} = require('../controllers/contactController');
const { validateId, validateContactMessage } = require('../middleware/validation');
const { contactLimiter } = require('../middleware/rateLimiter');

/**
 * @route   GET /api/contact/recent
 * @desc    Récupérer les messages de contact récents (admin)
 * @access  Public (à protéger en production)
 * @query   ?limit=10&traite=false
 */
router.get('/recent', getRecentMessages);

/**
 * @route   GET /api/contact/stats
 * @desc    Récupérer les statistiques des messages de contact (admin)
 * @access  Public (à protéger en production)
 */
router.get('/stats', getContactStats);

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

/**
 * @route   PUT /api/contact/message/:messageId/status
 * @desc    Marquer un message comme traité/non traité (admin)
 * @access  Public (à protéger en production)
 * @body    { traite: boolean }
 */
router.put('/message/:messageId/status', markMessageAsProcessed);

module.exports = router;