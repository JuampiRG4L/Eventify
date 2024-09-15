const express = require('express');
const router = express.Router();
const salonController = require('../Controllers/salonController');

// Ruta para mostrar la lista de salones
router.get('/halls', salonController.getAllSalons);

// Ruta para mostrar los detalles de un salón
router.get('/sub_halls/:id', salonController.getSalonDetails);

// Ruta para mostrar el formulario de edición de salón
router.get('/edit-room/:id', salonController.getSalonForEdit);

// Ruta para procesar el formulario de edición de salón
router.post('/edit-room/:id', salonController.editSalon);

// Ruta para eliminar un salón
router.post('/delete-room/:id', salonController.deleteSalon);

module.exports = router;
