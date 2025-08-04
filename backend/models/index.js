const { sequelize } = require('../config/database');

// Import des modèles
const Category = require('./Category');
const Speciality = require('./Speciality');
const Artisan = require('./Artisan');
const Review = require('./Review');
const ContactMessage = require('./ContactMessage');

// Définition des relations
// Une catégorie a plusieurs spécialités
Category.hasMany(Speciality, {
  foreignKey: 'id_categorie',
  as: 'specialites',
  onDelete: 'CASCADE'
});

// Une spécialité appartient à une catégorie
Speciality.belongsTo(Category, {
  foreignKey: 'id_categorie',
  as: 'categorie'
});

// Une spécialité a plusieurs artisans
Speciality.hasMany(Artisan, {
  foreignKey: 'id_specialite',
  as: 'artisans',
  onDelete: 'RESTRICT'
});

// Un artisan appartient à une spécialité
Artisan.belongsTo(Speciality, {
  foreignKey: 'id_specialite',
  as: 'specialite'
});

// Un artisan a plusieurs avis
Artisan.hasMany(Review, {
  foreignKey: 'id_artisan',
  as: 'avis',
  onDelete: 'CASCADE'
});

// Un avis appartient à un artisan
Review.belongsTo(Artisan, {
  foreignKey: 'id_artisan',
  as: 'artisan'
});

// Un artisan a plusieurs messages de contact
Artisan.hasMany(ContactMessage, {
  foreignKey: 'id_artisan',
  as: 'messages',
  onDelete: 'CASCADE'
});

// Un message de contact appartient à un artisan
ContactMessage.belongsTo(Artisan, {
  foreignKey: 'id_artisan',
  as: 'artisan'
});

// Fonction pour synchroniser la base de données
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ Base de données synchronisée avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
  }
};

module.exports = {
  sequelize,
  Category,
  Speciality,
  Artisan,
  Review,
  ContactMessage,
  syncDatabase
};