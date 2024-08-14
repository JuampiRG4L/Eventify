const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');



// Registro
router.post('/register', async (req, res) => {
  const { nombre, correo, contraseña, proveedor, id_proveedor } = req.body;
  const db = req.db;

  try {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    await db.query('INSERT INTO Usuarios (nombre, correo, contraseña, proveedor, id_proveedor) VALUES (?, ?, ?, ?, ?)', 
    [nombre, correo, hashedPassword, proveedor, id_proveedor]);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  const db = req.db;

  try {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  }
});

// Solicitar restablecimiento de contraseña
router.post('/request-reset-password', [
  check('correo', 'Correo electrónico es requerido').isEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { correo } = req.body;
  const db = req.db;

  try {
      const [userRows] = await db.query('SELECT id FROM Usuarios WHERE correo = ?', [correo]);
      if (userRows.length === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const userId = userRows[0].id;
      const token = crypto.randomBytes(20).toString('hex');
      const expiration = new Date(Date.now() + 3600000); // cada token tiene 1 hora de expiración

      await db.query('INSERT INTO RestablecimientoContraseña (id_usuario, token, expiracion) VALUES (?, ?, ?)',
          [userId, token, expiration]);

      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: correo,
          subject: 'Restablecimiento de Contraseña',
          text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:3300/auth/reset-password?token=${token}`
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Enlace de restablecimiento enviado al correo' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Restablecer contraseña
router.post('/reset-password', [
  check('token', 'Token es requerido').notEmpty(),
  check('contraseña', 'Contraseña es requerida').isLength({ min: 8 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { token, contraseña } = req.body;
  const db = req.db;

  try {
      const [resetRecord] = await db.query('SELECT * FROM RestablecimientoContraseña WHERE token = ? AND expiracion > NOW()', [token]);
      if (resetRecord.length === 0) {
          return res.status(400).json({ message: 'Token inválido o expirado' });
      }

      const hashedPassword = await bcrypt.hash(contraseña, 10);
      await db.query('UPDATE Usuarios SET contraseña = ? WHERE id = ?', [hashedPassword, resetRecord[0].id_usuario]);

      await db.query('DELETE FROM RestablecimientoContraseña WHERE token = ?', [token]);

      res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
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
