
const categoryService = require('../services/categoryService');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json({ success: true, data: categories, count: categories.length });
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const data = await categoryService.getCategoryBySlug(slug);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Catégorie non trouvée' });
    }
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getArtisansByCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const data = await categoryService.getArtisansByCategory(slug, req.query);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Catégorie non trouvée' });
    }
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryBySlug,
  getArtisansByCategory
};
