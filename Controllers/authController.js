    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const { Usuario } = require('../Models/User');
    const { Administrador }= require('../Models/Admin');

    // Función para registrar usuarios
// Función para registrar usuarios
const registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, proveedor, rol } = req.body;

        // Verificar el rol recibido
        console.log('Rol recibido:', rol);

        // Verifica si el correo ya existe en ambas tablas
        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        const adminExistente = await Administrador.findOne({ where: { correo } });

        if (usuarioExistente || adminExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Verifica el rol para determinar si registrar como usuario o administrador
        if (rol === 'admin') {
            console.log('Registrando como administrador');
            try {
                await Administrador.create({ nombre, correo, contraseña: '', rol, proveedor });
            } catch (error) {
                console.error('Error al crear administrador:', error);
                return res.status(500).json({ message: 'Error al registrar administrador.' });
            }
        } else {
            console.log('Registrando como usuario');
            try {
                await Usuario.create({ nombre, correo, contraseña: '', rol, proveedor });
            } catch (error) {
                console.error('Error al crear usuario:', error);
                return res.status(500).json({ message: 'Error al registrar usuario.' });
            }
        }

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario.' });
    }
};




    // Generar un token JWT
    function generarToken(user) {
        return jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
    }

    // Función para iniciar sesión
    async function iniciarSesion(req, res) {
        const { correo, contraseña } = req.body;

        try {
            let user = await Usuario.findOne({ where: { correo } });
            if (!user) {
                user = await Administrador.findOne({ where: { correo } });
            }

            if (!user) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }

            // Verificar contraseña
            const esContraseñaValida = await bcrypt.compare(contraseña, user.contraseña);
            if (!esContraseñaValida) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // Generar token JWT
            const token = generarToken(user);

            res.json({ message: 'Inicio de sesión exitoso', token, rol: user.rol });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión', error });
        }
    }

    // Función alternativa para iniciar sesión, si necesitas una variación
    async function loginUsuario(req, res) {
        const { correo, contraseña } = req.body;

        try {
            let user = await Usuario.findOne({ where: { correo } });
            if (!user) {
                user = await Administrador.findOne({ where: { correo } });
            }

            if (!user) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            const isMatch = await bcrypt.compare(contraseña, user.contraseña);

            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
            }

            const token = generarToken(user);

            res.status(200).json({ success: true, message: 'Inicio de Sesión Exitoso', user, token });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ success: false, message: 'Hubo un problema al iniciar sesión' });
        }
    }

    module.exports = {
        registrarUsuario,
        loginUsuario,
        generarToken,
        iniciarSesion
    };
