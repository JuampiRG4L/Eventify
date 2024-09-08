// Controllers/adminController.js

const { Usuario, Admin } = require('../Models/User');

// Promover un usuario a administrador
// Promover un usuario a administrador
async function promoverAAdmin(req, res) {
    try {
        const { id } = req.body; // Recibimos el id del usuario a promover

        // Validación del ID proporcionado
        if (!id) {
            return res.status(400).json({ message: 'ID de usuario es requerido.' });
        }

        // Buscar el usuario en la tabla de Usuarios
        let usuario = await Usuario.findByPk(id);

        // Si no se encuentra en la tabla de Usuarios, buscar en la tabla de Administradores
        if (!usuario) {
            usuario = await Admin.findByPk(id);
        }

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Verificar si el usuario ya es administrador
        if (usuario instanceof Admin) {
            return res.status(400).json({ message: 'El usuario ya es administrador.' });
        }

        // Si es un usuario normal, asignar el rol 'admin'
        if (usuario instanceof Usuario) {
            // Asignar el rol 'admin' al usuario
            usuario.rol = 'admin';

            // Guardar los cambios en la base de datos
            await usuario.save();

            // Responder con éxito
            res.json({ message: 'Usuario promovido a administrador exitosamente.', usuario: { id: usuario.id, rol: usuario.rol } });
        }
    } catch (error) {
        // Manejo detallado de errores con logs específicos
        console.error('Error al promover a administrador:', error);

        // Manejar errores específicos de Sequelize, si se usan
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación en la base de datos.', detalles: error.errors });
        }

        // Responder con error general del servidor
        res.status(500).json({ message: 'Error al promover el usuario.', error: error.message });
    }
}

module.exports = {
    promoverAAdmin
};

