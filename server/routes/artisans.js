const express = require('express');
const router = express.Router();
const {
  getAllArtisans,
  getArtisanById,
  getArtisansDuMois,
  searchArtisans,
  getDepartements,
  getVillesByDepartement
} = require('../controllers/artisanController');
const { validateId, validateSearchParams } = require('../middleware/validation');

/**
 * @route   GET /api/artisans
 * @desc    Récupérer tous les artisans avec filtres et pagination
 * @access  Public
 * @query   ?page=1&limit=12&ville=Lyon&departement=Rhône&specialite=1&search=plombier&artisan_du_mois=true
 */
router.get('/', validateSearchParams, getAllArtisans);

/**
 * @route   GET /api/artisans/search
 * @desc    Rechercher des artisans
 * @access  Public
 * @query   ?q=plombier&page=1&limit=12
 */
router.get('/search', searchArtisans);

/**
 * @route   GET /api/artisans/artisans-du-mois
 * @desc    Récupérer les artisans du mois
 * @access  Public
 * @query   ?limit=3
 */
router.get('/artisans-du-mois', getArtisansDuMois);

/**
 * @route   GET /api/artisans/departements
 * @desc    Récupérer la liste des départements disponibles
 * @access  Public
 */
router.get('/departements', getDepartements);

/**
 * @route   GET /api/artisans/departements/:departement/villes
 * @desc    Récupérer les villes d'un département
 * @access  Public
 */
router.get('/departements/:departement/villes', getVillesByDepartement);

/**
 * @route   GET /api/artisans/:id
 * @desc    Récupérer un artisan par son ID
 * @access  Public
 */
router.get('/:id', validateId, getArtisanById);

module.exports = router;