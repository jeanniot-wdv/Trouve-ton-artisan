const { Category, Speciality, Artisan } = require('../models');
const { Sequelize, Op } = require('sequelize');

// Récupérer toutes les catégories avec leurs spécialités et le nombre d'artisans
const findAllCategoriesWithSpecialitiesAndCount = () => 
  Category.findAll({
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

const findCategoryBySlugWithSpecialitiesAndArtisanCount = (slug) =>
  Category.findOne({
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

const findCategoryBySlug = (slug) =>
  Category.findOne({ where: { slug_categorie: slug } });

const findAndCountAllArtisansByCategory = (criteria) =>
  Artisan.findAndCountAll(criteria);

module.exports = {
  findAllCategoriesWithSpecialitiesAndCount,
  findCategoryBySlugWithSpecialitiesAndArtisanCount,
  findCategoryBySlug,
  findAndCountAllArtisansByCategory,
  Op
};
