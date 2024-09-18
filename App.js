require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const passport = require('passport');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const auth = require('./Middleware/auth');
const authRoutes = require('./Routes/authRoutes');
const adminRoutes = require('./Routes/adminRoutes'); // Asegúrate de que este archivo esté correctamente ubicado
const userRoutes = require('./Routes/userRoutes')
const path = require('path');
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
app.set('view cache', false);


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

app.use('/', userRoutes)
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use( authRoutes )

app.get('/login', (req, res) => {
  res.render('Login');
});


// Manejo de errores y puerto
// app.use((req, res, next) => {
//   res.status(404).send('Página no encontrada');
// });

app.get('/perfil', (req, res) => {
  res.json({ message: 'Perfil del usuario'});
});


// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Passport configuration
require('./Passport/passport-setup');
