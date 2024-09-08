// authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Usuario } = require('../Models/User');
const { Administrador } = require('../Models/Admin')
const { registrarUsuario, iniciarSesion } = require('../Controllers/authController');

// Registro de usuario
router.post('/register', registrarUsuario);

// Inicio de sesión de usuario
router.post('/login', iniciarSesion);

module.exports = router;