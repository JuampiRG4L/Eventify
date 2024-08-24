const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../Middleware/auth');
const { ensureAuthenticated } = require('../Middleware/auth');

router.get('/', (req, res) => {
  res.render('User/index');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('User/index');
});

router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('User/profile');
});

router.get('/reservation', ensureAuthenticated, (req, res) => {
  res.render('User/reservation');
});

// Otras rutas...
// Ruta protegida para los usuarios autenticados
router.get('/perfil', isAuthenticated, (req, res) => {
  // Lógica para mostrar el perfil del usuario
  res.json({ message: 'Perfil del usuario', user: req.user });
});

// Puedes agregar más rutas protegidas para usuarios autenticados aquí
// Ver perfil del usuario (ya implementado)
router.get('/perfil', isAuthenticated, (req, res) => {
    // Lógica para mostrar el perfil del usuario
    res.json({ message: 'Perfil del usuario', user: req.user });
});

// Reservar un salón
router.post('/reservaciones/nueva', isAuthenticated, (req, res) => {
    // Lógica para crear una nueva reservación
    res.json({ message: 'Reservación creada con éxito' });
});

// Ver todas las reservaciones del usuario
router.get('/reservaciones', isAuthenticated, (req, res) => {
    // Lógica para listar las reservaciones del usuario autenticado
    res.json({ message: 'Listado de tus reservaciones' });
});

// Cancelar una reservación
router.delete('/reservaciones/:id/cancelar', isAuthenticated, (req, res) => {
    // Lógica para cancelar una reservación
    res.json({ message: 'Reservación cancelada con éxito' });
});

module.exports = router;

module.exports = router;
