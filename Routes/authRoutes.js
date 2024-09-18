const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')
const passport = require('../Passport/passport-setup'); // Asegúrate de tener correctamente configurado passport

// Ruta para seleccionar el rol y luego redirigir a Google para la autenticación
router.post('/auth/select-role', (req, res) => {
  // Guardar el rol seleccionado en la sesión (puede ser 'admin' o 'usuario')
  req.session.rol = req.body.rol; 
  // Redirigir a la ruta de autenticación de Google
  res.redirect('/auth/google');
});

// Ruta de autenticación con Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Ruta de callback de Google
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirigir al lugar correspondiente según el rol
    if (req.user.isAdmin) {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/user/index');
    }
  }
);

router.post('/register', userController.registrarUsuario); // Asegúrate de que esté correctamente definida
router.post('/login', userController.loginUsuario);
console.log('Rutas POST /register y /login configuradas correctamente');

module.exports = router;