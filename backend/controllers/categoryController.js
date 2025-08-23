const { Category, Speciality, Artisan } = require('../models');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');

// Récupérer toutes les catégories avec leurs spécialités et le nombre d'artisans
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM artisans a
              INNER JOIN specialites s ON a.id_specialite = s.id_specialite
              WHERE s.id_categorie = Category.id_categorie
              AND a.actif = true
            )`),
            'nb_artisans'
          ]
        ]
      },
      include: [
        {
          model: Speciality,
          as: 'specialites',
          attributes: ['id_specialite', 'nom_specialite']
        }
      ],
      order: [['nom_categorie', 'ASC']]
    });

    res.json({
      success: true,
      data: categories,
      count: categories.length
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer une catégorie par son slug
const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const category = await Category.findOne({
      where: { slug_categorie: slug },
      include: [
        {
          model: Speciality,
          as: 'specialites',
          attributes: ['id_specialite', 'nom_specialite', 'description'],
          include: [
            {
              model: Artisan,
              as: 'artisans',
              where: { actif: true },
              attributes: ['id_artisan'],
              required: false
            }
          ]
        }
      ]
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    // Compter le nombre d'artisans par spécialité
    const categoryData = category.toJSON();
    categoryData.specialites = categoryData.specialites.map(specialite => ({
      ...specialite,
      nombre_artisans: specialite.artisans ? specialite.artisans.length : 0,
      artisans: undefined // Supprimer les données d'artisans, on ne veut que le count
    }));

    // Compter le nombre total d'artisans pour cette catégorie
    const totalArtisans = categoryData.specialites.reduce((total, spec) => total + spec.nombre_artisans, 0);
    categoryData.nb_artisans = totalArtisans;

    res.json({
      success: true,
      data: categoryData
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer les artisans d'une catégorie avec pagination et filtres
const getArtisansByCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { 
      page = 1, 
      limit = 12, 
      ville, 
      departement, 
      specialite,
      search 
    } = req.query;

    // Vérifier que la catégorie existe
    const category = await Category.findOne({
      where: { slug_categorie: slug }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    // Construire les conditions de recherche
    const whereConditions = {
      actif: true
    };

    if (ville) {
      whereConditions.ville = {
        [Op.like]: `%${ville}%`
      };
    }

    if (departement) {
      whereConditions.departement = {
        [Op.like]: `%${departement}%`
      };
    }

    if (search) {
      whereConditions[Op.or] = [
        { nom: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    // Conditions pour les spécialités
    const specialityWhere = { id_categorie: category.id_categorie };
    if (specialite) {
      specialityWhere.id_specialite = specialite;
    }

    const offset = (page - 1) * limit;

    const { count, rows: artisans } = await Artisan.findAndCountAll({
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

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: {
        artisans,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryBySlug,
  getArtisansByCategory
};