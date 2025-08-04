const { ContactMessage, Artisan, Speciality, Category } = require('../models');

// Envoyer un message de contact à un artisan
const sendContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom_expediteur, email_expediteur, objet, message } = req.body;

    // Vérifier que l'artisan existe et est actif
    const artisan = await Artisan.findOne({
      where: { 
        id_artisan: id,
        actif: true 
      },
      attributes: ['id_artisan', 'nom', 'email']
    });

    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: 'Artisan non trouvé'
      });
    }

    // Créer le message de contact
    const contactMessage = await ContactMessage.create({
      id_artisan: id,
      nom_expediteur,
      email_expediteur: email_expediteur.toLowerCase(),
      objet,
      message,
      traite: false
    });

    // TODO: Ici, vous pourriez ajouter l'envoi d'email à l'artisan
    // Par exemple avec Nodemailer ou un service comme SendGrid
    
    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès. L\'artisan vous contactera bientôt.',
      data: {
        id_message: contactMessage.id_message,
        nom_expediteur: contactMessage.nom_expediteur,
        objet: contactMessage.objet,
        created_at: contactMessage.created_at
      }
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer les messages de contact d'un artisan (pour l'admin)
const getMessagesByArtisan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10, traite } = req.query;

    // Vérifier que l'artisan existe
    const artisan = await Artisan.findByPk(id);
    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: 'Artisan non trouvé'
      });
    }

    const whereConditions = { id_artisan: id };
    if (traite !== undefined) {
      whereConditions.traite = traite === 'true';
    }

    const offset = (page - 1) * limit;

    const { count, rows: messages } = await ContactMessage.findAndCountAll({
      where: whereConditions,
      attributes: [
        'id_message', 
        'nom_expediteur', 
        'email_expediteur', 
        'objet', 
        'message', 
        'traite', 
        'created_at'
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: {
        messages,
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

// Récupérer tous les messages de contact récents (pour l'admin)
const getRecentMessages = async (req, res, next) => {
  try {
    const { limit = 10, traite } = req.query;

    const whereConditions = {};
    if (traite !== undefined) {
      whereConditions.traite = traite === 'true';
    }

    const messages = await ContactMessage.findAll({
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
              include: [
                {
                  model: Category,
                  as: 'categorie',
                  attributes: ['nom_categorie']
                }
              ]
            }
          ]
        }
      ],
      attributes: [
        'id_message', 
        'nom_expediteur', 
        'email_expediteur', 
        'objet', 
        'message', 
        'traite', 
        'created_at'
      ],
      limit: parseInt(limit),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: messages,
      count: messages.length
    });
  } catch (error) {
    next(error);
  }
};

// Marquer un message comme traité (pour l'admin)
const markMessageAsProcessed = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const { traite = true } = req.body;

    const message = await ContactMessage.findByPk(messageId);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé'
      });
    }

    await message.update({ traite });

    res.json({
      success: true,
      message: `Message marqué comme ${traite ? 'traité' : 'non traité'}`,
      data: {
        id_message: message.id_message,
        traite: message.traite
      }
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer les statistiques des messages de contact
const getContactStats = async (req, res, next) => {
  try {
    const { sequelize } = require('../config/database');

    const stats = await ContactMessage.findOne({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id_message')), 'total'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN traite = true THEN 1 END')), 'traites'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN traite = false THEN 1 END')), 'non_traites']
      ],
      raw: true
    });

    // Messages par mois (derniers 6 mois)
    const monthlyStats = await ContactMessage.findAll({
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m'), 'mois'],
        [sequelize.fn('COUNT', sequelize.col('id_message')), 'nombre']
      ],
      where: {
        created_at: {
          [require('sequelize').Op.gte]: sequelize.literal('DATE_SUB(NOW(), INTERVAL 6 MONTH)')
        }
      },
      group: [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m')],
      order: [[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m'), 'DESC']],
      raw: true,
      limit: 6
    });

    res.json({
      success: true,
      data: {
        total: parseInt(stats?.total || 0),
        traites: parseInt(stats?.traites || 0),
        non_traites: parseInt(stats?.non_traites || 0),
        pourcentage_traites: stats?.total > 0 ? Math.round((stats.traites / stats.total) * 100) : 0,
        mensuel: monthlyStats
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendContactMessage,
  getMessagesByArtisan,
  getRecentMessages,
  markMessageAsProcessed,
  getContactStats
};