const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');



router.post('/register', userController.registrarUsuario); // Asegúrate de que esté correctamente definida
router.post('/login', userController.loginUsuario);
console.log('Rutas POST /register y /login configuradas correctamente');

module.exports = router;