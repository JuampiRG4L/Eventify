// userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const salonController = require('../Controllers/salonController');
const { isAuthenticated, ensureAdmin } = require('../Middleware/auth');

// Rutas
router.get('/', (req, res) => {
  res.render('User/index');
});

router.get('/reservation', (req, res) => {
  res.render('User/reservation');
});

// Ruta para registro de usuario
router.post('/register', authController.registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', authController.iniciarSesion);

// Ejemplo de ruta protegida para usuarios autenticados
router.get('/perfil', isAuthenticated, (req, res) => {
  res.json({ message: 'Perfil del usuario', user: req.user });
});


router.get('/halls', (req, res) => {
  res.render('User/halls');
});

module.exports = router;
