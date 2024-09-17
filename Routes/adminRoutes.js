const express = require('express');
const router = express.Router();
const salonController = require('../Controllers/salonController');

// Ruta para el dashboard
router.get('/dashboard', (req, res) => {
  res.render('Admin/dashboard');
});

// Ruta para mostrar el formulario de agregar salón
router.get('/add-room', (req, res) => {
  res.render('Admin/addRoom');
});

// Ruta para procesar el formulario de agregar salón
router.post('/add-room', salonController.addSalon);

// Ruta para mostrar la lista de salones
router.get('/hallsad', salonController.getAllSalonsAdmin);

// Ruta para mostrar los detalles de un salón
router.get('/sub_hallsad/:id', salonController.getSalonDetails);

// Ruta para mostrar el formulario de edición de salón
router.get('/edit-room/:id', salonController.getSalonForEdit);

// Ruta para procesar el formulario de edición de salón
router.post('/edit-room/:id', salonController.editSalon);

// Ruta para eliminar un salón
router.post('/delete-room/:id', salonController.deleteSalon);

module.exports = router;
