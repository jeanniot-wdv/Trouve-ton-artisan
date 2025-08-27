const contactService = require('../services/contactService');

const sendContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.sendContactMessage(id, req.body);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Artisan non trouvé' });
    }
    res.status(201).json({
      success: true,
      message: "Message envoyé avec succès. L'artisan vous contactera bientôt.",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getMessagesByArtisan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await contactService.getMessagesByArtisan(id, req.query);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Artisan non trouvé' });
    }
    res.json({ success: true, data: data.messages, pagination: data.pagination });
  } catch (error) {
    next(error);
  }
};

const getRecentMessages = async (req, res, next) => {
  try {
    const messages = await contactService.getRecentMessages(req.query);
    res.json({ success: true, data: messages, count: messages.length });
  } catch (error) {
    next(error);
  }
};

const markMessageAsProcessed = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const { traite = true } = req.body;
    const result = await contactService.markMessageAsProcessed(messageId, traite);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Message non trouvé' });
    }
    res.json({
      success: true,
      message: `Message marqué comme ${traite ? 'traité' : 'non traité'}`,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getContactStats = async (req, res, next) => {
  try {
    const stats = await contactService.getContactStats();
    res.json({ success: true, data: stats });
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
