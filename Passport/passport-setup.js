const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2/promise');

// Conexión a la base de datos
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ProyectoEventify'
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true // Permite pasar el request para usar el rol en el callback
},
async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Determinar el rol basado en la selección del usuario
    const rolSeleccionado = req.session.rol || 'usuario'; // Si no selecciona, se asigna 'usuario'

    // Buscar el usuario en la tabla correspondiente según el rol
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [profile.emails[0].value]);

    if (rows.length) {
      // Si el usuario existe, retornarlo
      return done(null, rows[0]);
    } else {
      // Si no existe, crearlo en la tabla correspondiente
      const newUser = {
        nombre: profile.displayName,
        correo: profile.emails[0].value,
        proveedor: 'google',
        id_proveedor: profile.id,
        rol: rolSeleccionado
      };

      if (rolSeleccionado === 'admin') {
        // Insertar en la tabla de Administradores si es admin
        const [result] = await db.query('INSERT INTO Administradores SET ?', newUser);
        newUser.id = result.insertId;
      } else {
        // Insertar en la tabla de Usuarios si es usuario
        const [result] = await db.query('INSERT INTO Usuarios SET ?', newUser);
        newUser.id = result.insertId;
      }

      return done(null, newUser);
    }
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Buscar el usuario por su ID en la base de datos
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE id = ?', [id]);

    if (rows.length) {
      const user = rows[0];

      // Verificar si el usuario es administrador
      const [adminRows] = await db.query('SELECT * FROM Administradores WHERE correo = ?', [user.correo]);
      user.isAdmin = adminRows.length > 0;

      done(null, user);
    } else {
      done(new Error('Usuario no encontrado'));
    }
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
