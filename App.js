require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const passport = require('passport');
const session = require('express-session');
const fileUpload = require('express-fileupload');
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
app.use('/', authRoutes);
console.log('Rutas de autenticación cargadas');

const adminRoutes = require('./Routes/adminRoutes'); // Asegúrate de que este archivo esté correctamente ubicado
app.use('/admin', adminRoutes);

const salonController = require('./Controllers/salonController');

const userRoutes = require('./Routes/userRoutes'); 
app.use('/user', userRoutes);


// Rutas de vistas
app.get('/', (req, res) => {
  res.render('User/index'); // Renderizar vista principal de usuario
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

// Ruta para redirigir a Google para la autenticación
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Lógica para redirigir según el rol del usuario
    if (req.user.rol === 'admin') {
      // Si es administrador, redirigir al dashboard
      res.redirect('/admin/dashboard');
    } else {
      // Si es un usuario normal, redirigir al index o página principal
      res.redirect('/index');
    }
});

// app.get('/auth/google', passport.Authenticator ('google', {
//   scope:['profile', 'email']
// }));

app.get('/reset-password', (req, res) => {
  res.render('RestablecimientoContraseña');
});

app.get('/user/payments', (req, res) => {
  res.render('User/payments');
});

// Manejo de errores y puerto
// app.use((req, res, next) => {
//   res.status(404).send('Página no encontrada');
// });

// Rutas para administradores
const auth = require('./Middleware/auth')
app.get('/admin/dashboard', auth.ensureAdmin, (req, res) => {
  res.render('Admin/dashboard');  // Redirige al dashboard de admin
});

app.get('/admin/add-room', auth.ensureAdmin, (req, res) => {
  res.render('Admin/addRoom');  // Redirige a la página para agregar salones
});

app.get('/admin/edit-room', auth.ensureAdmin, (req, res) => {
  res.render('Admin/editRoom');  // Redirige a la página para editar salones
});

app.get('/admin/dashboard', auth.ensureAdmin, (req,res) =>{
  res.render('Admin/dashboard');
})

//DEJAR ESTO QUIETO
// app.get('/reservation', auth.ensureAdmin, (req, res) => {
//   res.render('User/reservation');
// });

app.get('/user/reservation', (req, res) => {
  res.render('User/reservation');
});

// Manejar tanto GET como POST para /user/payments
app.route('/user/payments')
  .get((req, res) => {
    const { id, name, price, capacidad } = req.query;

    if (id && name && price && capacidad) {
      res.render('User/payments', { id, name, price, capacidad });
    } else {
      res.redirect('/user/halls');
    }
  })
  .post((req, res) => {
    const { id, name, price, capacidad } = req.body;

    if (id && name && price && capacidad) {
      res.render('User/payments', { id, name, price, capacidad });
    } else {
      res.redirect('/user/halls');
    }
  });



// Ejemplo de ruta para perfil, debería usar userController si es necesario
// app.get('/perfil', auth.isAuthenticated, (req, res) => {
//   res.json({ message: 'Perfil del usuario', user: req.user });
// });

app.get('/perfil', (req, res) => {
  res.json({ message: 'Perfil del usuario'});
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
