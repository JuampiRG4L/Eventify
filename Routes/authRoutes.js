const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const Usuario = require('../Models/User');
const Admin = require('../Models/Admin');
const Swal = require('sweetalert2');

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, correo, contraseña, proveedor } = req.body;

  try {
      const hashedPassword = await bcrypt.hash(contraseña, 10);
      const newUser = await Usuario.create({
          nombre,
          correo,
          contraseña: proveedor === 'local' ? hashedPassword : null,
          proveedor,
          id_proveedor: proveedor !== 'local' ? generarIdProveedor() : null
      });
      res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
  } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(400).json({ success: false, message: 'El correo ya está registrado' });
      } else {
          console.error(error);
          res.status(500).json({ success: false, message: 'Hubo un problema al registrar el usuario' });
      }
  }
});


// Inicio de sesión de usuario
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
      const user = await Usuario.findOne({ where: { correo } });
      if (!user) {
          return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }

      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
      }

      res.status(200).json({ success: true, message: 'Inicio de Sesión Exitoso', user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Hubo un problema al iniciar sesión' });
  }
});



// // Registro
// router.post('/register', async (req, res) => {
//   const { nombre, correo, contraseña, proveedor, id_proveedor } = req.body;
//   const db = req.db;

//   try {
//     const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
//     if (rows.length > 0) {
//       return res.status(400).json({ message: 'El correo ya está registrado' });
//     }

//     const hashedPassword = await bcrypt.hash(contraseña, 10);
//     await db.query('INSERT INTO Usuarios (nombre, correo, contraseña, proveedor, id_proveedor) VALUES (?, ?, ?, ?, ?)', 
//     [nombre, correo, hashedPassword, proveedor, id_proveedor]);

//     res.status(201).json({ message: 'Usuario registrado exitosamente' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error en el servidor' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { correo, contraseña } = req.body;
//   const db = req.db;

//   try {
//     const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
//     if (rows.length === 0) {
//       return res.status(400).json({ message: 'Usuario no encontrado' });
//     }

//     const user = rows[0];
//     const isMatch = await bcrypt.compare(contraseña, user.contraseña);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Contraseña incorrecta' });
//     }

//     res.status(200).json({ message: 'Inicio de sesión exitoso' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error en el servidor' });
//   }
// });


// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  }
});

// Solicitar restablecimiento de contraseña
const db = require('../config/db');

router.post('/request-reset-password', async (req, res) => {
    const { correo } = req.body;
    try {
        const [user] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
        if (!user) {
            return res.status(404).json({ message: 'Correo no encontrado.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiracion = new Date(Date.now() + 3600000); // 1 hora

        await db.query('INSERT INTO RestablecimientoContraseña (correo, token, expiracion) VALUES (?, ?, ?)', [correo, token, expiracion]);

        // Configurar nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: correo,
            subject: 'Enlace para restablecer tu contraseña',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:${process.env.PORT || 3308}/reset-password?token=${token}`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Enlace de restablecimiento enviado.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error al procesar tu solicitud.' });
    }
});

router.post('/reset-password', async (req, res) => {
    const { token, contraseña } = req.body;
    try {
        const [reset] = await db.query('SELECT * FROM RestablecimientoContraseña WHERE token = ?', [token]);
        if (!reset || reset.expiracion < new Date()) {
            return res.status(400).json({ message: 'Token no válido o expirado.' });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        await db.query('UPDATE Usuarios SET contraseña = ? WHERE correo = ?', [hashedPassword, reset.correo]);

        // Eliminar el registro de la tabla de restablecimiento de contraseña
        await db.query('DELETE FROM RestablecimientoContraseña WHERE token = ?', [token]);

        res.json({ message: 'Contraseña cambiada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error al restablecer la contraseña.' });
    }
});


// ruta de la Cuenta con google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

// Rutas de autenticación con Facebook (nuevas)
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });




module.exports = router;
