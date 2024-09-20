// userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const userController = require('../Controllers/userController');
const auth = require('../Middleware/auth.js');
const { isAuthenticated } = require('../Middleware/auth');

// Rutas
router.get('/', (req, res) => {
  res.render('User/index');
});

// Ruta del index
router.get('/user/index', (req, res) => {
  res.render('User/index');
});

// Ruta para los salones
router.get('/user/halls', (req, res) => {
  res.render('User/halls');
});

// Ruta para la información de los salones
router.get('/user/sub_halls', (req, res) => {
  res.render('User/sub_halls');
});

// Ruta para las reservas
router.get('/user/reservation', (req, res) => {
  res.render('User/reservation');
});

// Ruta para los pagos del usuario
router.get('/user/payments', (req, res) => {
  res.render('User/payments');
});

// Ruta para actualizar el perfil del usuario
router.get('/user/update-profile', (req, res) => {
  res.render('User/profile');
});

// Ruta para eliminar el perfil del usuario
router.get('/user/delete-profile', (req, res) => {
  res.render('User/profile');
});

// Ruta para cambiar la contraseña del login
router.get('/reset-password', (req, res) => {
  res.render('RestablecimientoContraseña');
});

// Ruta para obtener el perfil del usuario
router.get('/profile', isAuthenticated, userController.getProfile);

// Ruta para registro de usuario
router.post('/register', authController.registrarUsuario);

// Ejemplo de ruta protegida para usuarios autenticados
router.get('/perfil', isAuthenticated, (req, res) => {
  res.json({ message: 'Perfil del usuario', user: req.user });
});

// Método para actualizar el perfil de usuario
router.post('/update-profile', userController.updateProfile);

// Método para eliminar el perfil de usuario
router.post('/delete-profile', userController.deleteProfile);

module.exports = router;
