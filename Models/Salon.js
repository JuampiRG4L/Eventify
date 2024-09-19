const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que esta ruta es correcta

const Salon = sequelize.define('Salon', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cocina: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  wifi: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  estacionamiento: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  guardaObjetos: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  jardin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  balcon: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  decoracion: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sonido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  banos: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  movilidad: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Salon;
