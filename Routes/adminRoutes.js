const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const salonController = require('../Controllers/salonController');
const auth = require('../Middleware/auth')

// Ruta para el dashboard
router.get('/admin/dashboard', auth.ensureAdmin, (req, res)=> {
  res.render('Admin/dashboard');
});

// Ruta para mostrar el formulario de agregar salón
router.get('/admin/add-room', auth.ensureAdmin,(req, res)=> {
  res.render('Admin/addRoom');
});

// Ruta para acceder a la actualizacion del salon del administrador
router.get('/admin/edit-room', auth.ensureAdmin, (req, res) => {
  res.render('Admin/editRoom');  // Redirige a la página para editar salones
});

// Ruta para acceder a la actualizacion del perfil del administrador
router.get('/admin/update-profile', auth.ensureAdmin, (req,res)=>{
  res.render('Admin/adminprofile')
})

// Ruta para acceder a la eliminacion del perfil del administrador
router.get('/admin/delete-profile', auth.ensureAdmin, (req,res)=>{
  res.render('Admin/adminprofile')
})

// Ruta para procesar el formulario de agregar salón
router.post('/add-room', salonController.addSalon);

// Ruta para mostrar la lista de salones
router.get('/hallsad', salonController.getAllSalons);

// Ruta para mostrar los detalles de un salón
router.get('/sub_hallsad/:id', salonController.getSalonDetails);

// Ruta para mostrar el formulario de edición de salón
router.get('/edit-room/:id', salonController.getSalonForEdit);

// Ruta para procesar el formulario de edición de salón
router.post('/edit-room/:id', salonController.editSalon);

// Ruta para eliminar un salón
router.post('/delete-room/:id', salonController.deleteSalon);

// Actualizar perfil de administrador
router.post('/update-profile', adminController.updateProfile);

// Eliminar perfil de administrador
router.post('/delete-profile', adminController.deleteProfile);

module.exports = router;
