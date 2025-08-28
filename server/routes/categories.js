const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryBySlug,
  getArtisansByCategory
} = require('../controllers/categoryController');
const { validateSearchParams } = require('../middleware/validation');

/**
 * @route   GET /api/categories
 * @desc    Récupérer toutes les catégories avec leurs spécialités
 * @access  Public
 */
router.get('/', getAllCategories);

/**
 * @route   GET /api/categories/:slug
 * @desc    Récupérer une catégorie par son slug
 * @access  Public
 */
router.get('/:slug', getCategoryBySlug);

/**
 * @route   GET /api/categories/:slug/artisans
 * @desc    Récupérer les artisans d'une catégorie avec filtres et pagination
 * @access  Public
 * @query   ?page=1&limit=12&ville=Lyon&departement=Rhône&specialite=1&search=plombier
 */
router.get('/:slug/artisans', validateSearchParams, getArtisansByCategory);

module.exports = router;