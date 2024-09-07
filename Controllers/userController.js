// Controlador para usuarios
const bcrypt = require('bcryptjs');
const { Usuario } = require('../Models/User'); // Asegúrate de que la ruta sea correcta

async function registrarUsuario(req, res) {
    const { nombre, correo, contraseña, proveedor, rol } = req.body;  // Añade `rol`

    try {
        const hashedPassword = proveedor === 'local' ? await bcrypt.hash(contraseña, 10) : null;
        const usuario = await Usuario.create({
            nombre,
            correo,
            contraseña: hashedPassword,
            proveedor,
            id_proveedor: proveedor !== 'local' ? generarIdProveedor() : null,
            rol  // Añade `rol`
        });
        res.json({ message: 'Usuario registrado con éxito', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
}

async function loginUsuario(req, res) {
    const { correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Aquí agregamos el rol del usuario a la respuesta
        res.status(200).json({ success: true, message: 'Inicio de Sesión Exitoso', user: usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Hubo un problema al iniciar sesión' });
    }
}

module.exports = {
    registrarUsuario,
    loginUsuario
};
