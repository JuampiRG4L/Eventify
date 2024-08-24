const Sequelize = require('./database.sql');
const dotenv = require('dotenv');
const User = require('../Models/User');
const Admin = require('../Models/Admin');
const Room = require('../Models/Room');
const Reservation = require('../Models/Reservation');
const PasswordReset = require('../Models/PasswordReset'); 


// config/db.js

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Sincronizar todos los modelos con la base de datos
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Modelos sincronizados correctamente');
    })
    .catch((error) => {
        console.error('Error al sincronizar los modelos:', error);
    });

module.exports = Sequelize;


