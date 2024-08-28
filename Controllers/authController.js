//Controlador para autenticación

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const RestablecimientoContraseña = require('../Models/RestablecimientoContraseña');
const User = require('../Models/User');
const Admin  = require('../Models/Admin');
const Payment  = require('../Models/Payment');
const Room  = require('../Models/Room');
const Reservation = require('../Models/Reservation')

// Controlador para solicitar restablecimiento de contraseña
async function solicitarRestablecimiento (req, res) {
    try {
        const { correo } = req.body;
        const usuario = await User.findOne({ where: { correo } });

        if (!usuario) {
            // mensaje de error usando SweetAlert
            return res.render('ResetPassword', {
                alert: {
                    type: 'error',
                    title: 'Usuario no encontrado',
                    text: 'No existe una cuenta con ese correo electrónico.',
                },
            });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expiracion = Date.now() + 3600000; // 1 hora desde su uso

        await RestablecimientoContraseña.create({
            correo: usuario.correo,
            token,
            expiracion,
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: usuario.correo,
            subject: 'Restablecimiento de contraseña',
            text: `Estás recibiendo esto porque tú (u otra persona) has solicitado restablecer la contraseña de tu cuenta.\n\n
            Por favor, haz clic en el siguiente enlace, o pégalo en tu navegador para completar el proceso:\n\n
            http://${req.headers.host}/reset/${token}\n\n
            Si no solicitaste esto, ignora este correo y tu contraseña permanecerá sin cambios.\n`,
        };

        await transporter.sendMail(mailOptions);

        res.render('ResetPassword', {
            alert: {
                type: 'success',
                title: 'Correo enviado',
                text: 'Se ha enviado un correo con las instrucciones para restablecer tu contraseña.',
            },
        });
    } catch (error) {
        console.error(error);
        res.render('ResetPassword', {
            alert: {
                type: 'error',
                title: 'Error',
                text: 'Hubo un problema al intentar restablecer la contraseña.',
            },
        });
    }
};

// Controlador para restablecer la contraseña
async function restablecerContraseña (req, res) {
    try {
        const { token } = req.params;
        const { contraseña } = req.body;

        const solicitud = await RestablecimientoContraseña.findOne({
            where: {
                token,
                expiracion: { [Op.gt]: Date.now() },
            },
        });

        if (!solicitud) {
            return res.render('ResetPassword', {
                alert: {
                    type: 'error',
                    title: 'Token inválido o expirado',
                    text: 'El token de restablecimiento de contraseña no es válido o ha expirado.',
                },
            });
        }

        const usuario = await User.findOne({ where: { correo: solicitud.correo } });

        const hashedPassword = await bcrypt.hash(contraseña, 10);
        usuario.contraseña = hashedPassword;
        await usuario.save();

        await RestablecimientoContraseña.destroy({ where: { id: solicitud.id } });

        res.render('Login', {
            alert: {
                type: 'success',
                title: 'Contraseña restablecida',
                text: 'Tu contraseña ha sido restablecida con éxito. Ahora puedes iniciar sesión.',
            },
        });
    } catch (error) {
        console.error(error);
        res.render('ResetPassword', {
            alert: {
                type: 'error',
                title: 'Error',
                text: 'Hubo un problema al restablecer la contraseña.',
            },
        });
    }
};


module.exports = {
    solicitarRestablecimiento,
    restablecerContraseña
};

