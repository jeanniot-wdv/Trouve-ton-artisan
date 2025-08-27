const contactRepository = require('../repositories/contactRepository');
const { Artisan, Speciality, Category } = require('../models');

const sendContactMessage = async (id, data) => {
  const artisan = await contactRepository.findArtisanById(id);
  if (!artisan) return null;
  const messageData = {
    id_artisan: id,
    nom_expediteur: data.nom_expediteur,
    email_expediteur: data.email_expediteur.toLowerCase(),
    objet: data.objet,
    message: data.message,
    traite: false
  };
  const contactMessage = await contactRepository.createContactMessage(messageData);
  return {
    id_message: contactMessage.id_message,
    nom_expediteur: contactMessage.nom_expediteur,
    objet: contactMessage.objet,
    created_at: contactMessage.created_at
  };
};

const getMessagesByArtisan = async (id, { page = 1, limit = 10, traite }) => {
  const artisan = await contactRepository.findArtisanByPk(id);
  if (!artisan) return null;

  const whereConditions = { id_artisan: id };
  if (traite !== undefined) whereConditions.traite = traite === 'true';
  const offset = (page - 1) * limit;

  const { count, rows: messages } = await contactRepository.findAndCountAllMessagesByArtisan({
    where: whereConditions,
    attributes: [
      'id_message', 'nom_expediteur', 'email_expediteur', 'objet', 'message', 'traite', 'created_at'
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['created_at', 'DESC']]
  });
  return {
    messages,
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

const getRecentMessages = async ({ limit = 10, traite }) => {
  const whereConditions = {};
  if (traite !== undefined) whereConditions.traite = traite === 'true';

  return contactRepository.findAllMessages({
    where: whereConditions,
    include: [
      {
        model: Artisan,
        as: 'artisan',
        attributes: ['id_artisan', 'nom', 'ville'],
        include: [
          {
            model: Speciality,
            as: 'specialite',
            attributes: ['nom_specialite'],
            include: [{
              model: Category,
              as: 'categorie',
              attributes: ['nom_categorie']
            }]
          }
        ]
      }
    ],
    attributes: [
      'id_message', 'nom_expediteur', 'email_expediteur', 'objet', 'message', 'traite', 'created_at'
    ],
    limit: parseInt(limit),
    order: [['created_at', 'DESC']]
  });
};

const markMessageAsProcessed = async (messageId, traite = true) => {
  const message = await contactRepository.findMessageByPk(messageId);
  if (!message) return null;
  await contactRepository.updateMessage(message, { traite });
  return {
    id_message: message.id_message,
    traite: message.traite
  };
};

const getContactStats = async () => {
  const stats = await contactRepository.findStats();
  const monthlyStats = await contactRepository.findMonthlyStats();

  const total = parseInt(stats?.total || 0);
  const traites = parseInt(stats?.traites || 0);
  const non_traites = parseInt(stats?.non_traites || 0);

  return {
    total,
    traites,
    non_traites,
    pourcentage_traites: total > 0 ? Math.round((traites / total) * 100) : 0,
    mensuel: monthlyStats
  };
};

module.exports = {
  sendContactMessage,
  getMessagesByArtisan,
  getRecentMessages,
  markMessageAsProcessed,
  getContactStats
};
