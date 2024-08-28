const express = require('express');
const  Usuario  = require('../Models/User');
const  Admin  = require('../Models/Admin');
const  Payment  = require('../Models/Payment');
const  RestablecimientoContraseña  = require('../Models/RestablecimientoContraseña');
const  Room  = require('../Models/Room');
const router = express.Router();
const { isAdmin, isAuthenticated } = require('../Middleware/auth');
const { ensureAdmin } = require('../Middleware/auth');

// Ruta protegida para el dashboard
router.get('/dashboard', ensureAdmin, (req, res) => {
  res.render('Admin/dashboard');
});

// Ruta protegida para añadir un nuevo salón
router.get('/addRoom', ensureAdmin, (req, res) => {
  res.render('Admin/addRoom');
});

// Ruta protegida para editar un salón
router.get('/editRoom', ensureAdmin, (req, res) => {
  res.render('Admin/editRoom');
});

// Crear un nuevo salón
router.post('/salones/nuevo', isAuthenticated, isAdmin, (req, res) => {
  // Lógica para crear un nuevo salón
  res.json({ message: 'Salón creado con éxito' });
});

// Editar un salón existente
router.put('/salones/:id/editar', isAuthenticated, isAdmin, (req, res) => {
  // Lógica para editar un salón existente
  res.json({ message: 'Salón actualizado con éxito' });
});

// Eliminar un salón
router.delete('/salones/:id/eliminar', isAuthenticated, isAdmin, (req, res) => {
  // Lógica para eliminar un salón
  res.json({ message: 'Salón eliminado con éxito' });
});

// Ver todas las reservaciones
router.get('/reservaciones', isAuthenticated, isAdmin, (req, res) => {
  // Lógica para listar todas las reservaciones
  res.json({ message: 'Listado de reservaciones' });
});

// Confirmar o cancelar una reservación
router.put('/reservaciones/:id/actualizar', isAuthenticated, isAdmin, (req, res) => {
  // Lógica para actualizar el estado de una reservación
  res.json({ message: 'Reservación actualizada con éxito' });
});

module.exports = router;
