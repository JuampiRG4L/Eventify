const jwt = require('jsonwebtoken');

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    console.log('No se proporcionó token');
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.User = decoded;
    console.log('Usuario autenticado:', decoded);
    next();
  } catch (error) {
    console.log('Token inválido o expirado:', error);
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
}

// Middleware para verificar si el usuario es administrador
function ensureAdmin(req, res, next) {
  if (req.User && req.User.rol === 'admin') {
    console.log('Usuario es administrador');
    return next();
  }
  console.log('Acceso denegado, no es administrador');
  return res.status(403).json({ message: 'Acceso denegado. Necesitas ser administrador.' });
}

function verificarRol(rolesPermitidos) {
  return (req, res, next) => {
      const User = req.User; // Supongamos que el usuario ya está autenticado y disponible en req.usuario
      console.log('Rol del usuario:', User.rol);
      if (!rolesPermitidos.includes(User.rol)) {
        console.log('Usuario no tiene permisos');
          return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
      }

      next();
  };
}

module.exports = {
  isAuthenticated,
  ensureAdmin,
  verificarRol
};
