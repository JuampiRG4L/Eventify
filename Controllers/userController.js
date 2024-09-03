// Controlador para usuarios

const  Admin  = require('../Models/Admin');
const  Payment  = require('../Models/Payment');
const  RestablecimientoContraseña  = require('../Models/RestablecimientoContraseña');
const  Room  = require('../Models/Room');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../Models/User'); // Asegúrate de que la ruta sea correcta

async function registrarUsuario(req, res) {
    try {
        // Crear un nuevo usuario usando el modelo Sequelize
        const usuario = await Usuario.create({
            nombre,
            correo,
            contraseña: proveedor === 'local' ? hashedPassword : null,
            rol,
            id_proveedor: proveedor !== 'local' ? generarIdProveedor() : null
        });
        res.json({ message: 'Usuario registrado con éxito', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
}

module.exports = {
    registrarUsuario
};
