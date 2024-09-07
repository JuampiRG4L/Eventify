// Controllers/adminController.js

const Usuario = require('../Models/User');

// Promover un usuario a administrador
async function promoverAAdmin(req, res) {
    try {
        const { id } = req.body; // Recibimos el id del usuario a promover

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        usuario.rol = 'admin';
        await usuario.save();

        res.json({ message: 'Usuario promovido a administrador exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al promover el usuario.' });
    }
}

module.exports = {
    promoverAAdmin
};
