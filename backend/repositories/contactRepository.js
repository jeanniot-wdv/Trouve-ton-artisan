const { ContactMessage, Artisan, Speciality, Category } = require('../models');
const { Op, literal } = require('sequelize');
const { sequelize } = require('../config/database');

const findArtisanById = (id) =>
  Artisan.findOne({ where: { id_artisan: id, actif: true }, attributes: ['id_artisan', 'nom', 'email'] });

const findArtisanByPk = (id) =>
  Artisan.findByPk(id);

const createContactMessage = (data) =>
  ContactMessage.create(data);

const findAndCountAllMessagesByArtisan = (options) =>
  ContactMessage.findAndCountAll(options);

const findAllMessages = (options) =>
  ContactMessage.findAll(options);

const findMessageByPk = (messageId) =>
  ContactMessage.findByPk(messageId);

const updateMessage = (message, data) =>
  message.update(data);

const findStats = () =>
  ContactMessage.findOne({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('id_message')), 'total'],
      [sequelize.fn('COUNT', sequelize.literal('CASE WHEN traite = true THEN 1 END')), 'traites'],
      [sequelize.fn('COUNT', sequelize.literal('CASE WHEN traite = false THEN 1 END')), 'non_traites']
    ],
    raw: true
  });

const findMonthlyStats = () =>
  ContactMessage.findAll({
    attributes: [
      [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m'), 'mois'],
      [sequelize.fn('COUNT', sequelize.col('id_message')), 'nombre']
    ],
    where: {
      created_at: {
        [Op.gte]: literal('DATE_SUB(NOW(), INTERVAL 6 MONTH)')
      }
    },
    group: [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m')],
    order: [[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m'), 'DESC']],
    raw: true,
    limit: 6
  });

module.exports = {
  findArtisanById,
  createContactMessage,
  findAndCountAllMessagesByArtisan,
  findAllMessages,
  findArtisanByPk,
  findMessageByPk,
  updateMessage,
  findStats,
  findMonthlyStats,
  Op
};
