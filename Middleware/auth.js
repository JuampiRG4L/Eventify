// Middleware/auth.js

function isAdmin(req, res, next) {
    if (req.user && req.user.rol === 'admin') {
        return next();
    } else {
        return res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
    }
}

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ message: 'Debes iniciar sesión' });
    }
}

function ensureAdmin(req, res, next) {
    if (req.user && req.user.rol === 'admin') {
        return next();
    }
    res.redirect('/login');
    res.status(403).json({ message: 'Acceso denegado. Necesitas ser administrador.' });
}

module.exports = {
    isAdmin,
    isAuthenticated,
    ensureAdmin,
};
