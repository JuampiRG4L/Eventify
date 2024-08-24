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
  callbackURL: 'http://localhost:3308/auth/google/index'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Buscar el usuario en la tabla de Usuarios
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [profile.emails[0].value]);
    
    if (rows.length) {
      // Si el usuario existe, retornarlo
      return done(null, rows[0]);
    } else {
      // Si no existe, crearlo
      const newUser = {
        nombre: profile.displayName,
        correo: profile.emails[0].value,
        proveedor: 'google',
        id_proveedor: profile.id
      };
      const [result] = await db.query('INSERT INTO Usuarios SET ?', newUser);
      newUser.id = result.insertId;
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
