const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsByArtisan,
  getRecentReviews
} = require('../controllers/reviewController');
const { validateId, validateReview } = require('../middleware/validation');
const { reviewLimiter } = require('../middleware/rateLimiter');

/**
 * @route   GET /api/reviews/recent
 * @desc    Récupérer les avis récents
 * @access  Public
 * @query   ?limit=5&valide=true
 */
router.get('/recent', getRecentReviews);

/**
 * @route   GET /api/reviews/artisan/:id
 * @desc    Récupérer les avis d'un artisan
 * @access  Public
 * @query   ?page=1&limit=10
 */
router.get('/artisan/:id', validateId, getReviewsByArtisan);

/**
 * @route   POST /api/reviews/artisan/:id
 * @desc    Créer un nouvel avis pour un artisan
 * @access  Public
 * @body    { nom_client, email_client, note, commentaire? }
 */
router.post('/artisan/:id', 
  reviewLimiter,
  validateId, 
  validateReview, 
  createReview
);

module.exports = router;