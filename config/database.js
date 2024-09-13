const dotenv = require('dotenv');
const { sequelize } = require('../Models/index'); // Asegúrate de que esta línea importa la instancia de sequelize correcta

dotenv.config();

// Sincronizar todos los modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar los modelos:', error);
  });