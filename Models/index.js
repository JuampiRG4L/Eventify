const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Importar modelos
const Usuario = require('./User');
const Salon = require('./Room');
const Reservacion = require('./Reservation');
const Pago = require('./Payment');
const RestablecimientoContraseña = require('./RestablecimientoContraseña');

// Definir relaciones (si es necesario)
Usuario.hasMany(Reservacion, { foreignKey: 'id_usuario' });
Reservacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Salon.hasMany(Reservacion, { foreignKey: 'id_salon' });
Reservacion.belongsTo(Salon, { foreignKey: 'id_salon' });

Reservacion.hasMany(Pago, { foreignKey: 'id_reservacion' });
Pago.belongsTo(Reservacion, { foreignKey: 'id_reservacion' });

module.exports = {
  sequelize,
  Usuario,
  Salon,
  Reservacion,
  Pago,
  RestablecimientoContraseña,
};
