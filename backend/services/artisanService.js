const artisanRepository = require('../repositories/artisanRepository');

const getAllArtisans = async (params) => {
  const {
    page = 1,
    limit = 12,
    ville,
    departement,
    specialite,
    search,
    artisan_du_mois
  } = params;

  const { Op } = artisanRepository;
  const whereConditions = { actif: true };
  if (ville) whereConditions.ville = { [Op.like]: `%${ville}%` };
  if (departement) whereConditions.departement = { [Op.like]: `%${departement}%` };
  if (artisan_du_mois === 'true') whereConditions.artisan_du_mois = true;
  if (search) {
    whereConditions[Op.or] = [
      { nom: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
      { ville: { [Op.like]: `%${search}%` } }
    ];
  }

  const includeOptions = [{
    model: require('../models').Speciality,
    as: 'specialite',
    attributes: ['id_specialite', 'nom_specialite'],
    include: [{
      model: require('../models').Category,
      as: 'categorie',
      attributes: ['nom_categorie', 'slug_categorie']
    }]
  }];
  if (specialite) includeOptions.where = { id_specialite: specialite };

  const offset = (page - 1) * limit;
  const { count, rows: artisans } = await artisanRepository.findAndCountAllArtisans({
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

const getArtisanById = async (id) => {
  const { Op } = artisanRepository;

  return artisanRepository.findOneArtisan({
    where: {
      id_artisan: id,
      actif: true
    },
    include: [{
      model: require('../models').Speciality,
      as: 'specialite',
      attributes: ['id_specialite', 'nom_specialite', 'description'],
      include: [{
        model: require('../models').Category,
        as: 'categorie',
        attributes: ['nom_categorie', 'slug_categorie']
      }]
    }]
  });
};

const getArtisansDuMois = async (limit = 3) => {
  return artisanRepository.findAllArtisans({
    where: {
      artisan_du_mois: true,
      actif: true
    },
    include: [{
      model: require('../models').Speciality,
      as: 'specialite',
      attributes: ['nom_specialite'],
      include: [{
        model: require('../models').Category,
        as: 'categorie',
        attributes: ['nom_categorie', 'slug_categorie']
      }]
    }],
    limit: parseInt(limit),
    order: [['note_moyenne', 'DESC']]
  });
};

const searchArtisans = async (query, page = 1, limit = 12) => {
  if (!query || query.trim().length < 2) {
    throw new Error('La recherche doit contenir au moins 2 caractères');
  }
  const searchTerm = query.trim();
  const offset = (page - 1) * limit;
  const { Op } = artisanRepository;

  const { count, rows: artisans } = await artisanRepository.findAndCountAllArtisans({
    where: {
      actif: true,
      [Op.or]: [
        { nom: { [Op.like]: `%${searchTerm}%` } },
        { description: { [Op.like]: `%${searchTerm}%` } },
        { ville: { [Op.like]: `%${searchTerm}%` } },
        { departement: { [Op.like]: `%${searchTerm}%` } }
      ]
    },
    include: [{
      model: require('../models').Speciality,
      as: 'specialite',
      attributes: ['nom_specialite'],
      include: [{
        model: require('../models').Category,
        as: 'categorie',
        attributes: ['nom_categorie', 'slug_categorie']
      }]
    }],
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [
      ['artisan_du_mois', 'DESC'],
      ['note_moyenne', 'DESC']
    ]
  });

  return {
    artisans,
    searchTerm,
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

const getDepartements = async () => {
  const departements = await artisanRepository.findAllArtisans({
    attributes: ['departement'],
    where: { actif: true },
    group: ['departement'],
    order: [['departement', 'ASC']]
  });
  return departements.map(d => d.departement);
};

const getVillesByDepartement = async (departement) => {
  const villes = await artisanRepository.findAllArtisans({
    attributes: ['ville'],
    where: { departement, actif: true },
    group: ['ville'],
    order: [['ville', 'ASC']]
  });
  return villes.map(v => v.ville);
};

module.exports = {
  getAllArtisans,
  getArtisanById,
  getArtisansDuMois,
  searchArtisans,
  getDepartements,
  getVillesByDepartement
};
