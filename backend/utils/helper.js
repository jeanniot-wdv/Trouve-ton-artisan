/**
 * Fonctions utilitaires pour l'API
 */

// Générer un slug à partir d'une chaîne
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/-+/g, '-') // Supprimer les tirets multiples
    .trim('-'); // Supprimer les tirets en début/fin
};

// Formater une note (arrondir à 1 décimale)
const formatRating = (rating) => {
  if (!rating || isNaN(rating)) return 0.0;
  return Math.round(rating * 10) / 10;
};

// Valider un email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Valider un numéro de téléphone français
const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
  return phoneRegex.test(phone.replace(/[\s\.\-\(\)]/g, ''));
};

// Formater un numéro de téléphone
const formatPhoneNumber = (phone) => {
  if (!phone) return null;
  const cleaned = phone.replace(/[\s\.\-\(\)]/g, '');
  if (cleaned.startsWith('+33')) {
    return cleaned.replace('+33', '0');
  }
  return cleaned;
};

// Capitaliser la première lettre de chaque mot
const capitalizeWords = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Tronquer un texte
const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Générer une réponse d'API standardisée
const createApiResponse = (success, data = null, message = '', errors = null) => {
  const response = { success };
  
  if (message) response.message = message;
  if (data !== null) response.data = data;
  if (errors) response.errors = errors;
  
  return response;
};

// Créer un objet de pagination
const createPagination = (page, limit, totalItems) => {
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = parseInt(page);
  
  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage: parseInt(limit),
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null
  };
};

// Calculer la distance entre deux points GPS (formule haversine)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance en km
};

// Générer des statistiques d'étoiles pour les avis
const calculateRatingStats = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return {
      moyenne: 0,
      total: 0,
      repartition: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const total = reviews.length;
  const sum = reviews.reduce((acc, review) => acc + review.note, 0);
  const moyenne = formatRating(sum / total);
  
  const repartition = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(review => {
    repartition[review.note]++;
  });

  return { moyenne, total, repartition };
};

// Nettoyer et valider les paramètres de recherche
const sanitizeSearchParams = (params) => {
  const cleaned = {};
  
  if (params.page) {
    const page = parseInt(params.page);
    cleaned.page = page > 0 ? page : 1;
  }
  
  if (params.limit) {
    const limit = parseInt(params.limit);
    cleaned.limit = limit > 0 && limit <= 50 ? limit : 12;
  }
  
  if (params.ville) {
    cleaned.ville = params.ville.trim();
  }
  
  if (params.departement) {
    cleaned.departement = params.departement.trim();
  }
  
  if (params.specialite) {
    const specialite = parseInt(params.specialite);
    if (specialite > 0) cleaned.specialite = specialite;
  }
  
  if (params.search) {
    cleaned.search = params.search.trim();
  }
  
  return cleaned;
};

module.exports = {
  generateSlug,
  formatRating,
  isValidEmail,
  isValidPhoneNumber,
  formatPhoneNumber,
  capitalizeWords,
  truncateText,
  createApiResponse,
  createPagination,
  calculateDistance,
  calculateRatingStats,
  sanitizeSearchParams
};