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
  callbackURL: '/auth/google/callback'
},

async (accessToken, refreshToken, profile, done) => {
  try {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [profile.emails[0].value]);
    if (rows.length) {
      return done(null, rows[0]);
    } else {
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
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
    if (rows.length) {
      done(null, rows[0]);
    } else {
      done(new Error('Usuario no encontrado'));
    }
  } catch (err) {
    done(err);
  }
});
