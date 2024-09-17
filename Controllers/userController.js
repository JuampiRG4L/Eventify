const bcrypt = require('bcryptjs');
const Usuario = require('../Models/User'); // Asegúrate de que la ruta sea correcta
const Administrador = require('../Models/Admin');

// Función para registrar usuarios
const registrarUsuario = async (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body); // Verificar el contenido del body
    console.log('Endpoint /register alcanzado'); // Verificar si llega a la función
    console.log('Cuerpo de la solicitud en /register:', req.body);

    try {
        let { nombre, correo, contraseña, proveedor, rol } = req.body; // Añadí el campo contraseña

        console.log(`Rol recibido: ${rol}`); // Log del rol recibido

        // Verificar si el correo ya existe en ambas tablas
        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        const adminExistente = await Administrador.findOne({ where: { correo } });

        console.log(`Usuario existente: ${usuarioExistente}, Admin existente: ${adminExistente}`);

        if (usuarioExistente || adminExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Validar que el campo 'rol' es correcto antes de la creación
        if (!rol) {
            return res.status(400).json({ message: 'El rol es requerido.' });
        }

        // Normaliza el rol a valores permitidos
        if (rol === 'user') {
            rol = 'usuario'; // Normalización a 'usuario'
        }

        console.log(`Rol normalizado: ${rol}`); // Log del rol normalizado

        // Hashear la contraseña antes de crear el usuario
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        if (rol === 'admin') {
            // Crear un Administrador si el rol es 'admin'
            await Administrador.create({ nombre, correo, contraseña: hashedPassword, rol, proveedor });
            console.log('Administrador registrado con éxito');
        } else if (rol === 'usuario') { // Verificar el rol normalizado
            // Crear un Usuario si el rol es 'usuario'
            await Usuario.create({ nombre, correo, contraseña: hashedPassword, rol, proveedor });
            console.log('Usuario registrado con éxito');
        } else {
            return res.status(400).json({ message: 'Rol no válido.' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario.' });
    }
};

// Función para iniciar sesión
async function loginUsuario(req, res) {
    const { correo, contraseña } = req.body;

    try {
        let usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            usuario = await Administrador.findOne({ where: { correo } });
        }

        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña); // Comparar contraseña hasheada

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ success: true, message: 'Inicio de Sesión Exitoso', user: usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Hubo un problema al iniciar sesión' });
    }
}

exports.payments = (req, res) => {
    const { id, name, price, capacidad } = req.query;
    // Aquí puedes agregar la lógica para calcular el total si es necesario
    res.render('user/payments', { id, name, price, capacidad });
};

module.exports = {
    registrarUsuario,
    loginUsuario
};
