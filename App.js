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
<<<<<<< HEAD

const salonController = require('./Controllers/salonController');

const reservationController = require('./Controllers/reservationController')

const userRoutes = require('./Routes/userRoutes');
=======
>>>>>>> 51f1c95dcc49c81ddd320a5f244eae92ea431e82
app.use('/user', userRoutes);
app.use( authRoutes )

app.get('/login', (req, res) => {
  res.render('Login');
});

<<<<<<< HEAD
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

app.get('/user/payments/:id', async (req, res) => {
  try {
      const salonId = req.params.id;
      const salon = await Salon.findByPk(salonId); // Asegúrate de que 'Salon' esté definido

      if (!salon) {
          return res.redirect('/user/reservations'); // Redirige si no se encuentra
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
=======
>>>>>>> 51f1c95dcc49c81ddd320a5f244eae92ea431e82




// Manejo de errores y puerto
// app.use((req, res, next) => {
//   res.status(404).send('Página no encontrada');
// });

<<<<<<< HEAD
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


//DEJAR ESTO QUIETO
// app.get('/reservation', auth.ensureAdmin, (req, res) => {
//   res.render('User/reservation');
// });

app.get('/user/reservation', (req, res) => {
  res.render('User/reservation');
});

// Manejar tanto GET como POST para /user/payments
app.post('/user/payments', (req, res) => {
  const { id, name, capacidad, price, image, fecha } = req.body; // Asegúrate de extraer 'id'

  // Renderizar la vista de pagos y pasar los datos necesarios
  res.render('User/payments', {
    id, // Asegúrate de que 'id' esté incluido aquí
    name, 
    capacidad, 
    price, 
    image, 
    fecha 
  });
});




// Ejemplo de ruta para perfil, debería usar userController si es necesario
// app.get('/perfil', auth.isAuthenticated, (req, res) => {
//   res.json({ message: 'Perfil del usuario', user: req.user });
// });

=======
>>>>>>> 51f1c95dcc49c81ddd320a5f244eae92ea431e82
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