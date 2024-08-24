// Controlador para usuarios

// userController.js
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Ajusta la ruta si es necesario

async function registrarUsuario(req, res) {
    const { nombre, correo, contraseña, rol = 'usuario' } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contraseña, salt);

        const nuevoUsuario = {
            nombre,
            correo,
            contraseña: hash,
            proveedor: 'local',
            rol
        };

        await db.query('INSERT INTO Usuarios SET ?', nuevoUsuario);
        res.json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
}

module.exports = {
    registrarUsuario
};
