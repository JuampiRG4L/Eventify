// adminRoutes.js
const express = require('express');
const router = express.Router();
const { ensureAdmin } = require('../Middleware/auth');
const adminController = require('../Controllers/adminController');
const { verificarRol } = require('../Middleware/auth');

router.post('/dashboard', ensureAdmin, verificarRol(['administrador']), (req, res) => {
  res.render('Admin/dashboard');
});


// Ejemplo de ruta para promover a usuario a administrador
router.post('/promote', ensureAdmin, adminController.promoverAAdmin);

module.exports = router;