const Sequelize  = require('sequelize'); // Requerir Sequelize de la librería correcta
const dotenv = require('dotenv');
const Usuario = require('../Models/User');
const Admin = require('../Models/Admin');
const Room = require('../Models/Room');
const Reservation = require('../Models/Reservation');
const PasswordReset = require('../Models/RestablecimientoContraseña'); 

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de Sequelize usando las credenciales del archivo .env
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

// Exportar la instancia de Sequelize para usarla en otros archivos


module.exports = {
  sequelize
};

