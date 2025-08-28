const { ContactMessage, Artisan } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

const findArtisanById = (id) =>
  Artisan.findOne({ where: { id_artisan: id, actif: true }, attributes: ['id_artisan', 'nom', 'email'] });

const findArtisanByPk = (id) =>
  Artisan.findByPk(id);

const createContactMessage = (data) =>
  ContactMessage.create(data);

const findAllMessages = (options) =>
  ContactMessage.findAll(options);

const findMessageByPk = (messageId) =>
  ContactMessage.findByPk(messageId);

const updateMessage = (message, data) =>
  message.update(data);

module.exports = {
  findArtisanById,
  createContactMessage,
  findAllMessages,
  findArtisanByPk,
  findMessageByPk,
  updateMessage,
  Op
};
