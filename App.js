require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const app = express();

// Conexión a la base de datos
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ProyectoEventify'

  /*
  host: 'sql302.infinityfree.com',
  user: 'if0_37016621',
  password: '62yFFArM5M',
  database: 'ProyectoEventify'
  */
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// Configuración para servir archivos estáticos
app.use('/Public', express.static(path.join(__dirname, '/Public')));
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
app.use('/auth', authRoutes);

const userRoutes = require('./Routes/userRoutes');
app.use('/user', userRoutes);

const adminRoutes = require('./Routes/adminRoutes');
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.render('User/index'); // O se puede renderizar una vista
});

app.get('/index', (req, res) => {
  res.render('User/index');
});

app.get('/login', (req, res) => {
  res.render('Login');
});

app.get('/reset-password', (req, res) => {
  res.render('ResetPassword');
});

// Puerto
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Passport configuration
require('./Passport/passport-setup');
require('./Passport/passport-setupFacebook');
