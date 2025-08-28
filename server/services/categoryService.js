
const categoryRepository = require('../repositories/categoryRepository');
const { Speciality, Category } = require('../models');

const getAllCategories = async () => {
  return categoryRepository.findAllCategoriesWithSpecialitiesAndCount();
};

const getCategoryBySlug = async (slug) => {
  const category = await categoryRepository.findCategoryBySlugWithSpecialitiesAndArtisanCount(slug);
  if (!category) return null;
  // Postprocessing : on ajoute les counts dans chaque spécialité + total
  const categoryData = category.toJSON();
  categoryData.specialites = categoryData.specialites.map(specialite => ({
    ...specialite,
    nombre_artisans: specialite.artisans ? specialite.artisans.length : 0,
    artisans: undefined
  }));
  categoryData.nb_artisans = categoryData.specialites.reduce((total, spec) => total + spec.nombre_artisans, 0);
  return categoryData;
};

const getArtisansByCategory = async (slug, options) => {
  // Vérifier que la catégorie existe
  const category = await categoryRepository.findCategoryBySlug(slug);
  if (!category) return null;
  
  const {
    page = 1,
    limit = 12,
    ville,
    departement,
    specialite,
    search
  } = options;

  const { Op } = categoryRepository;
  const whereConditions = { actif: true };
  if (ville) whereConditions.ville = { [Op.like]: `%${ville}%` };
  if (departement) whereConditions.departement = { [Op.like]: `%${departement}%` };
  if (search) {
    whereConditions[Op.or] = [
      { nom: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } }
    ];
  }

  const specialityWhere = { id_categorie: category.id_categorie };
  if (specialite) specialityWhere.id_specialite = specialite;

  const offset = (page - 1) * limit;
  const { count, rows: artisans } = await categoryRepository.findAndCountAllArtisansByCategory({
    where: whereConditions,
    include: [
      {
        model: Speciality,
        as: 'specialite',
        where: specialityWhere,
        attributes: ['id_specialite', 'nom_specialite'],
        include: [
          {
            model: Category,
            as: 'categorie',
            attributes: ['nom_categorie', 'slug_categorie']
          }
        ]
      }
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [
      ['artisan_du_mois', 'DESC'],
      ['note_moyenne', 'DESC'],
      ['nom', 'ASC']
    ]
  });
  return {
    artisans,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      itemsPerPage: parseInt(limit),
      hasNextPage: page < Math.ceil(count / limit),
      hasPrevPage: page > 1
    }
  };
};

module.exports = {
  getAllCategories,
  getCategoryBySlug,
  getArtisansByCategory
};
