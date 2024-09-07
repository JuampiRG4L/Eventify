// authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Usuario } = require('../Models/User');
const authController = require('../Controllers/authController');

// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Registro de usuario
router.post('/register', authController.registrarUsuario);

// Inicio de sesión de usuario
router.post('/login', authController.loginUsuario);

// Solicitar restablecimiento de contraseña
router.post('/request-reset-password', authController.solicitarRestablecimiento);

// Ruta para restablecer la contraseña
router.post('/reset-password', authController.restablecerContraseña);

module.exports = router;
