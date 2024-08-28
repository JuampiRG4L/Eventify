// Controlador para usuarios

const  Admin  = require('../Models/Admin');
const  Payment  = require('../Models/Payment');
const  RestablecimientoContraseña  = require('../Models/RestablecimientoContraseña');
const  Room  = require('../Models/Room');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../Models/User'); // Asegúrate de que la ruta sea correcta

async function registrarUsuario(req, res) {
    const { nombre, correo, contraseña, rol = 'usuario' } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contraseña, salt);

        // Crear un nuevo usuario usando el modelo Sequelize
        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            contraseña: hash,
            proveedor: 'local',
            rol
        });

        res.json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
}

module.exports = {
    registrarUsuario
};
