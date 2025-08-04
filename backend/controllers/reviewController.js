const { Review, Artisan } = require('../models');
const { sequelize } = require('../config/database');

// Créer un nouvel avis
const createReview = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { nom_client, email_client, note, commentaire } = req.body;

    // Vérifier que l'artisan existe et est actif
    const artisan = await Artisan.findOne({
      where: { 
        id_artisan: id,
        actif: true 
      }
    });

    if (!artisan) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'Artisan non trouvé'
      });
    }

    // Vérifier si le client n'a pas déjà laissé un avis pour cet artisan
    const existingReview = await Review.findOne({
      where: {
        id_artisan: id,
        email_client: email_client.toLowerCase()
      }
    });

    if (existingReview) {
      await transaction.rollback();
      return res.status(409).json({
        success: false,
        message: 'Vous avez déjà laissé un avis pour cet artisan'
      });
    }

    // Créer l'avis
    const review = await Review.create({
      id_artisan: id,
      nom_client,
      email_client: email_client.toLowerCase(),
      note: parseInt(note),
      commentaire: commentaire || null,
      valide: false // Les avis doivent être validés par un admin
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      success: true,
      message: 'Avis envoyé avec succès. Il sera publié après validation.',
      data: {
        id_avis: review.id_avis,
        nom_client: review.nom_client,
        note: review.note,
        commentaire: review.commentaire,
        created_at: review.created_at
      }
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// Récupérer les avis d'un artisan
const getReviewsByArtisan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Vérifier que l'artisan existe
    const artisan = await Artisan.findByPk(id);
    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: 'Artisan non trouvé'
      });
    }

    const offset = (page - 1) * limit;

    const { count, rows: reviews } = await Review.findAndCountAll({
      where: { 
        id_artisan: id,
        valide: true 
      },
      attributes: ['id_avis', 'nom_client', 'note', 'commentaire', 'created_at'],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    // Calculer les statistiques des avis
    const stats = await Review.findOne({
      where: { 
        id_artisan: id,
        valide: true 
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('note')), 'moyenne'],
        [sequelize.fn('COUNT', sequelize.col('id_avis')), 'total'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN note = 5 THEN 1 END')), 'note_5'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN note = 4 THEN 1 END')), 'note_4'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN note = 3 THEN 1 END')), 'note_3'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN note = 2 THEN 1 END')), 'note_2'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN note = 1 THEN 1 END')), 'note_1']
      ],
      raw: true
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: {
        reviews,
        stats: {
          moyenne: parseFloat(stats?.moyenne || 0).toFixed(1),
          total: parseInt(stats?.total || 0),
          repartition: {
            5: parseInt(stats?.note_5 || 0),
            4: parseInt(stats?.note_4 || 0),
            3: parseInt(stats?.note_3 || 0),
            2: parseInt(stats?.note_2 || 0),
            1: parseInt(stats?.note_1 || 0)
          }
        },
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

// Récupérer les avis récents (pour l'admin ou la page d'accueil)
const getRecentReviews = async (req, res, next) => {
  try {
    const { limit = 5, valide } = req.query;

    const whereConditions = {};
    if (valide !== undefined) {
      whereConditions.valide = valide === 'true';
    }

    const reviews = await Review.findAll({
      where: whereConditions,
      include: [
        {
          model: Artisan,
          as: 'artisan',
          attributes: ['id_artisan', 'nom', 'ville'],
          where: { actif: true }
        }
      ],
      attributes: ['id_avis', 'nom_client', 'note', 'commentaire', 'valide', 'created_at'],
      limit: parseInt(limit),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: reviews,
      count: reviews.length
    });
  } catch (error) {
    next(error);
  }
};

// Fonction utilitaire pour mettre à jour les statistiques d'un artisan
const updateArtisanStats = async (artisanId) => {
  try {
    const stats = await Review.findOne({
      where: { 
        id_artisan: artisanId,
        valide: true 
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('note')), 'moyenne'],
        [sequelize.fn('COUNT', sequelize.col('id_avis')), 'total']
      ],
      raw: true
    });

    await Artisan.update({
      note_moyenne: parseFloat(stats?.moyenne || 0),
      nombre_avis: parseInt(stats?.total || 0)
    }, {
      where: { id_artisan: artisanId }
    });

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des stats artisan:', error);
    return false;
  }
};

module.exports = {
  createReview,
  getReviewsByArtisan,
  getRecentReviews,
  updateArtisanStats
};