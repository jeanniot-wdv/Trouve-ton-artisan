const { Artisan, Speciality, Category } = require('../models');
const { Op } = require('sequelize');

const findAndCountAllArtisans = (options) => Artisan.findAndCountAll(options);

const findOneArtisan = (options) => Artisan.findOne(options);

const findAllArtisans = (options) => Artisan.findAll(options);

module.exports = {
  findAndCountAllArtisans,
  findOneArtisan,
  findAllArtisans,
  Op
};
