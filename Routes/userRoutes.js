// userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const userController = require('../Controllers/userController');
const auth = require ('../Middleware/auth.js');
const { isAuthenticated, ensureAdmin } = require('../Middleware/auth');

// Rutas
router.get('/', (req, res) => {
  res.render('User/index');
});

//ruta del index
router.get('/user/index', (req, res) => {
  res.render('User/index');
});

// ruta para los salones
router.get('/user/halls', (req, res) => {
  res.render('User/halls');
});

// ruta para la información de los salones
router.get('/user/sub_halls', (req, res) => {
  res.render('User/sub_halls');
});

// ruta para las reservacionee
router.get('/user/reservation', (req, res) => {
  res.render('User/reservation');
});

// ruta para los pagos del usuario
router.get('/user/payments', (req, res) => {
  res.render('User/payments');
});

// ruta para actualizar el perfil del usuario
router.get('/user/update-profile', (req, res)=>{
  res.render('User/profile')
});

// ruta para eliminar el perfil del usuario
router.get('/user/delete-profile', (req, res)=>{
  res.render('User/profile')
});

// ruta para cambiar la contraseña del login
router.get('/reset-password', (req, res) => {
  res.render('RestablecimientoContraseña');
});

// ruta para obtener el perfil del usuario
router.get('/profile', isAuthenticated, userController.getProfile);

// Ruta para registro de usuario
router.post('/register', authController.registrarUsuario);

// Ruta para iniciar sesión
// router.post('/login', authController.iniciarSesion);

// Ejemplo de ruta protegida para usuarios autenticados
router.get('/perfil', isAuthenticated, (req, res) => {
  res.json({ message: 'Perfil del usuario', user: req.user });
});

// Metodo para actualizar el perfil de usuario
router.post('/update-profile', userController.updateProfile);

// Metodo para Eliminar el perfil de usuario
router.post('/delete-profile', userController.deleteProfile);

module.exports = router;
