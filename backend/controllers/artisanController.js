
const artisanService = require('../services/artisanService');

const getAllArtisans = async (req, res, next) => {
  try {
    const data = await artisanService.getAllArtisans(req.query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getArtisanById = async (req, res, next) => {
  try {
    const artisan = await artisanService.getArtisanById(req.params.id);
    if (!artisan) {
      return res.status(404).json({ success: false, message: 'Artisan non trouvé' });
    }
    res.json({ success: true, data: artisan });
  } catch (error) {
    next(error);
  }
};

const getArtisansDuMois = async (req, res, next) => {
  try {
    const limit = req.query.limit || 3;
    const artisans = await artisanService.getArtisansDuMois(limit);
    res.json({ success: true, data: artisans, count: artisans.length });
  } catch (error) {
    next(error);
  }
};

const searchArtisans = async (req, res, next) => {
  try {
    const { q: query, page = 1, limit = 12 } = req.query;
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'La recherche doit contenir au moins 2 caractères' });
    }
    const data = await artisanService.searchArtisans(query, page, limit);
    res.json({ success: true, data });
  } catch (error) {
    // Pour renvoyer une erreur explicite côté service
    if (error.message === 'La recherche doit contenir au moins 2 caractères') {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const getDepartements = async (req, res, next) => {
  try {
    const departements = await artisanService.getDepartements();
    res.json({ success: true, data: departements, count: departements.length });
  } catch (error) {
    next(error);
  }
};

const getVillesByDepartement = async (req, res, next) => {
  try {
    const { departement } = req.params;
    const villes = await artisanService.getVillesByDepartement(departement);
    res.json({ success: true, data: villes, count: villes.length });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllArtisans,
  getArtisanById,
  getArtisansDuMois,
  searchArtisans,
  getDepartements,
  getVillesByDepartement
};
