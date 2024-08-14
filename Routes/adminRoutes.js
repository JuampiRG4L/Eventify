//Rutas para administradores

// Routes/adminRoutes.js
const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.render('Admin/dashboard');
});

router.get('/addRoom', (req, res) => {
  res.render('Admin/addRoom');
});

router.get('/editRoom', (req, res) => {
  res.render('Admin/editRoom');
});

module.exports = router;
