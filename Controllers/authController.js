const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/User');
const Administrador = require('../Models/Admin');

// Generar un token JWT
function generarToken(user) {
    console.log('Generando token para el usuario:', user);
    return jwt.sign(
        { id: user.id, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

// Función para registrar usuarios
const registrarUsuario = async (req, res) => {
    console.log('Cuerpo de la solicitud en registrarUsuario:', req.body);
    try {
        const { nombre, correo, proveedor, rol } = req.body;

        // Verificar el rol recibido
        console.log('Rol recibido:', rol);

        // Verifica si el correo ya existe en ambas tablas
        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        const adminExistente = await Administrador.findOne({ where: { correo } });

        console.log(`Usuario existente: ${usuarioExistente ? 'Sí' : 'No'}, Admin existente: ${adminExistente ? 'Sí' : 'No'}`);

        if (usuarioExistente || adminExistente) {
            console.log('El correo ya está registrado.');
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Verifica el rol para determinar si registrar como usuario o administrador
        if (rol === 'admin') {
            console.log('Registrando como administrador');
            try {
                await Administrador.create({ nombre, correo, contraseña: '', rol, proveedor });
                console.log('Administrador registrado con éxito');
            } catch (error) {
                console.error('Error al crear administrador:', error);
                return res.status(500).json({ message: 'Error al registrar administrador.' });
            }
        } else if (rol === 'user') {
            console.log('Registrando como usuario');
            try {
                await Usuario.create({ nombre, correo, contraseña: '', rol, proveedor });
                console.log('Usuario registrado con éxito');
            } catch (error) {
                console.error('Error al crear usuario:', error);
                return res.status(500).json({ message: 'Error al registrar usuario.' });
            }
        } else {
            console.log('Rol no válido:', rol);
            return res.status(400).json({ message: 'Rol no válido.' });
        }

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario.' });
    }
};

// Función para iniciar sesión
async function iniciarSesion(req, res) {
    const { correo, contraseña } = req.body;

    console.log('Cuerpo de la solicitud en iniciarSesion:', req.body);

    try {
        let user = await Usuario.findOne({ where: { correo } });
        if (!user) {
            console.log('Usuario no encontrado en la tabla Usuarios, buscando en Administradores...');
            user = await Administrador.findOne({ where: { correo } });
        }

        if (!user) {
            console.log('Usuario no encontrado en ambas tablas');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        console.log('Contraseña proporcionada:', contraseña);
        console.log('Contraseña en base de datos:', user.contraseña);

        const esContraseñaValida = await bcrypt.compare(contraseña, user.contraseña);
        console.log('¿Coincide la contraseña?:', esContraseñaValida);

        if (!esContraseñaValida) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = generarToken(user);

        // Enviar la respuesta con el token y el rol del usuario
        res.json({ message: 'Inicio de sesión exitoso', token, rol: user.rol });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
}


module.exports = {
    registrarUsuario,
    iniciarSesion,
    generarToken
};
