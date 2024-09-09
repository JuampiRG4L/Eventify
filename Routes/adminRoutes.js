const express = require('express');
const router = express.Router();
const { ensureAdmin, verificarRol } = require('../Middleware/auth');
const adminController = require('../Controllers/adminController'); // Asegúrate de que este archivo exista

//Ruta para el dashboard
router.get('/dashboard', ensureAdmin, verificarRol(['administrador']), (req, res) => {
  res.render('admin/dashboard');
});

// Ruta para agregar salón
router.get('/add', ensureAdmin, (req, res) => {
  res.render('admin/addRoom');
});

// Ruta para editar salón
router.get('/edit', ensureAdmin, (req, res) => {
  res.render('admin/editRoom');
});

// Ejemplo de ruta para promover a usuario a administrador
router.post('/promote', ensureAdmin, adminController.promoverAAdmin); // Usa el controlador adecuado

module.exports = router;
