const { Artisan, Speciality, Category } = require('../models');
const { Op } = require('sequelize');

// Récupérer tous les artisans avec pagination et filtres
const getAllArtisans = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      ville, 
      departement, 
      specialite,
      search,
      artisan_du_mois 
    } = req.query;

    const whereConditions = { actif: true };

    // Filtres
    if (ville) {
      whereConditions.ville = { [Op.like]: `%${ville}%` };
    }

    if (departement) {
      whereConditions.departement = { [Op.like]: `%${departement}%` };
    }

    if (artisan_du_mois === 'true') {
      whereConditions.artisan_du_mois = true;
    }

    if (search) {
      whereConditions[Op.or] = [
        { nom: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { ville: { [Op.like]: `%${search}%` } }
      ];
    }

    // Include pour spécialité
    const includeOptions = [
      {
        model: Speciality,
        as: 'specialite',
        attributes: ['id_specialite', 'nom_specialite'],
        include: [
          {
            model: Category,
            as: 'categorie',
            attributes: ['nom_categorie', 'slug_categorie']
          }
        ]
      }
    ];

    // Filtre par spécialité si fourni
    if (specialite) {
      includeOptions[0].where = { id_specialite: specialite };
    }

    const offset = (page - 1) * limit;

    const { count, rows: artisans } = await Artisan.findAndCountAll({
      where: whereConditions,
      include: includeOptions,
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

// Récupérer un artisan par son ID
const getArtisanById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const artisan = await Artisan.findOne({
      where: { 
        id_artisan: id,
        actif: true 
      },
      include: [
        {
          model: Speciality,
          as: 'specialite',
          attributes: ['id_specialite', 'nom_specialite', 'description'],
          include: [
            {
              model: Category,
              as: 'categorie',
              attributes: ['nom_categorie', 'slug_categorie']
            }
          ]
        }
      ]
    });

    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: 'Artisan non trouvé'
      });
    }

    res.json({
      success: true,
      data: artisan
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer les artisans du mois
const getArtisansDuMois = async (req, res, next) => {
  try {
    const { limit = 3 } = req.query;

    const artisans = await Artisan.findAll({
      where: { 
        artisan_du_mois: true,
        actif: true 
      },
      include: [
        {
          model: Speciality,
          as: 'specialite',
          attributes: ['nom_specialite'],
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
      order: [['note_moyenne', 'DESC']]
    });

    res.json({
      success: true,
      data: artisans,
      count: artisans.length
    });
  } catch (error) {
    next(error);
  }
};

// Rechercher des artisans
const searchArtisans = async (req, res, next) => {
  try {
    const { q: query, page = 1, limit = 12 } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'La recherche doit contenir au moins 2 caractères'
      });
    }

    const searchTerm = query.trim();
    const offset = (page - 1) * limit;

    const { count, rows: artisans } = await Artisan.findAndCountAll({
      where: {
        actif: true,
        [Op.or]: [
          { nom: { [Op.like]: `%${searchTerm}%` } },
          { description: { [Op.like]: `%${searchTerm}%` } },
          { ville: { [Op.like]: `%${searchTerm}%` } },
          { departement: { [Op.like]: `%${searchTerm}%` } }
        ]
      },
      include: [
        {
          model: Speciality,
          as: 'specialite',
          attributes: ['nom_specialite'],
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
        ['note_moyenne', 'DESC']
      ]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: {
        artisans,
        searchTerm,
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

// Récupérer les départements disponibles
const getDepartements = async (req, res, next) => {
  try {
    const departements = await Artisan.findAll({
      attributes: ['departement'],
      where: { actif: true },
      group: ['departement'],
      order: [['departement', 'ASC']]
    });

    const departementsUniques = departements.map(d => d.departement);

    res.json({
      success: true,
      data: departementsUniques,
      count: departementsUniques.length
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer les villes disponibles pour un département
const getVillesByDepartement = async (req, res, next) => {
  try {
    const { departement } = req.params;

    const villes = await Artisan.findAll({
      attributes: ['ville'],
      where: { 
        departement,
        actif: true 
      },
      group: ['ville'],
      order: [['ville', 'ASC']]
    });

    const villesUniques = villes.map(v => v.ville);

    res.json({
      success: true,
      data: villesUniques,
      count: villesUniques.length
    });
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