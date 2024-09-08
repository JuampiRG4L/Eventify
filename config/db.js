const Sequelize  = require('sequelize'); // Requerir Sequelize de la librería correcta
const dotenv = require('dotenv');
const Models = require('../Models')


// Cargar las variables de entorno desde el archivo .env
dotenv.config();



// Sincronizar todos los modelos con la base de datos
Models.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar los modelos:', error);
  });

// Exportar la instancia de Sequelize para usarla en otros archivos


module.exports = {
  Sequelize,
  Models
};

