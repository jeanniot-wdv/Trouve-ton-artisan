const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Review = sequelize.define('Review', {
  id_avis: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_artisan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'artisans',
      key: 'id_artisan'
    }
  },
  nom_client: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email_client: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  commentaire: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  valide: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'avis',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    { fields: ['id_artisan'] },
    { fields: ['valide'] }
  ]
});

module.exports = Review;