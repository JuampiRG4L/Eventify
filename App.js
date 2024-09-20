require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const passport = require('passport');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const path = require('path');
const { Salon } = require('./models');
require('./config/db');

const app = express();

// Conexión a la base de datos
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ProyectoEventify'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/uploads', express.static('public/uploads'));
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

// Configuración para servir archivos estáticos
app.use('/Public', express.static(path.join(__dirname, 'Public')));
app.use('/libs', express.static(path.join(__dirname, 'libs')));

// Configurar sesiones
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para añadir la conexión a la base de datos a las solicitudes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Rutas
const authRoutes = require('./Routes/authRoutes');
app.use('/', authRoutes);
console.log('Rutas de autenticación cargadas');

const adminRoutes = require('./Routes/adminRoutes'); 
app.use('/admin', adminRoutes);

const salonController = require('./Controllers/salonController');
const reservationController = require('./Controllers/reservationController');

const userRoutes = require('./Routes/userRoutes'); 
app.use('/user', userRoutes);

// Rutas de vistas
app.get('/', (req, res) => {
  res.render('User/index');
});

app.get('/index', (req, res) => {
  res.render('User/index');
});

app.get('/sub_halls', (req, res) => {
  res.render('User/sub_halls');
});

app.get('/login', (req, res) => {
  res.render('Login');
});

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
}), (req, res) => {
  if (req.user.rol === 'admin') {
    return res.redirect('/admin/dashboard');
  } else {
    return res.redirect('/user/index');
  }
});

// Ruta para redirigir a Google para la autenticación
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    if (req.user.rol === 'admin') {
      return res.redirect('/admin/dashboard');
    } else {
      return res.redirect('/user/index');
    }
});

app.get('/reset-password', (req, res) => {
  res.render('RestablecimientoContraseña');
});

app.get('/user/payments/:id', async (req, res) => {
  try {
      const salonId = req.params.id;
      const salon = await Salon.findByPk(salonId);

      if (!salon) {
          return res.redirect('/user/reservations');
      }

      res.render('User/payments', {
          salon: salon,
          id: salon.id,
          name: salon.name,
          price: salon.price,
          capacidad: salon.capacidad,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
  }
});

// Rutas para administradores
const auth = require('./Middleware/auth');
app.get('/admin/dashboard', (req, res) => {
  res.render('Admin/dashboard');
});

app.get('/admin/add-room', (req, res) => {
  res.render('Admin/addRoom');
});

app.get('/admin/edit-room', (req, res) => {
  res.render('Admin/editRoom');
});

// DEJAR ESTO QUIETO
app.get('/user/reservation', (req, res) => {
  res.render('User/reservation');
});

// Manejar tanto GET como POST para /user/payments
app.post('/user/payments', (req, res) => {
  const { id, name, capacidad, price, image, fecha } = req.body;

  res.render('User/payments', {
    id,
    name,
    capacidad,
    price,
    image,
    fecha
  });
});

app.get('/perfil', (req, res) => {
  res.json({ message: 'Perfil del usuario' });
});

app.get('/halls', salonController.getAllSalons);
app.get('/sub_halls', salonController.getSalonDetailsUser);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Passport configuration
require('./Passport/passport-setup');
