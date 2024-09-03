// userRoutes.js
const Usuario  = require('../Models/User');
const express = require('express');
const router = express.Router();
const { isAuthenticated, ensureAdmin } = require('../Middleware/auth');

// Rutas
router.get('/', (req, res) => {
  res.render('User/index');
});

router.get('/dashboard', ensureAdmin, (req, res) => {
  res.render('User/index');
});

router.get('/halls', (req, res) => {
  res.render('User/halls');
});

router.get('/profile', ensureAdmin, (req, res) => {
  res.render('User/profile');
});

router.get('/reservation', ensureAdmin, (req, res) => {
  res.render('User/reservation');
});

router.get('/perfil', isAuthenticated, (req, res) => {
  res.json({ message: 'Perfil del usuario', user: req.user });
});

router.post('/reservaciones/nueva', isAuthenticated, (req, res) => {
  res.json({ message: 'Reservación creada con éxito' });
});

router.get('/reservaciones', isAuthenticated, (req, res) => {
  res.json({ message: 'Listado de tus reservaciones' });
});

router.delete('/reservaciones/:id/cancelar', isAuthenticated, (req, res) => {
  res.json({ message: 'Reservación cancelada con éxito' });
});

module.exports = router;
