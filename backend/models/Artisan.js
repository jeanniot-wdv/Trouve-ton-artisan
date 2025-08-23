const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Speciality = require('./Speciality');

const Artisan = sequelize.define('Artisan', {
  id_artisan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      is: /^[0-9+\-\.\s\(\)]+$/
    }
  },
  adresse: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 255]
    }
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  code_postal: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[0-9]{5}$/
    }
  },
  departement: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  id_specialite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'specialites',
      key: 'id_specialite'
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  note_moyenne: {
    type: DataTypes.DECIMAL(3, 1),
    defaultValue: 0.0,
    validate: {
      min: 0,
      max: 5
    }
  },
  nombre_avis: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  artisan_du_mois: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'artisans',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['nom'] },
    { fields: ['ville'] },
    { fields: ['departement'] },
    { fields: ['actif'] },
    { fields: ['artisan_du_mois'] }
  ]
});

module.exports = Artisan;