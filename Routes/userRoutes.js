const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('User/index');
});

router.get('/login', (req, res) => {
  res.render('Login');
});

router.get('/dashboard', (req, res) => {
  res.render('User/index');
});

router.get('/profile', (req, res) => {
  res.render('User/profile');
});

router.get('/reservation', (req, res) => {
  res.render('User/reservation');
});

router.get('/salones', (req, res) => {
  res.render('User/salones');
});


router.get('/lounge', (req, res) => {
  res.render('User/lounge');
});

router.get('/payments', (req, res) => {
  res.render('User/payments'); 
});


module.exports = router;
