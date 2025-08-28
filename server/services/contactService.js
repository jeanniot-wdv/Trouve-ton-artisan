const contactRepository = require('../repositories/contactRepository');

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

module.exports = {
  sendContactMessage,
  getMessagesByArtisan
};
