// controllers/reservationController.js
const { Reservaciones } = require('../models'); // Asegúrate de tener el modelo configurado

exports.createReserva = async (req, res) => {
    const { id_salon, tipo_evento, numero_de_personas, hora_inicio, hora_fin, precio_total } = req.body;
    
    try {
        const nuevaReserva = await Reservaciones.create({
            id_usuario: req.user.id,
            id_salon,
            tipo_evento,
            numero_de_personas,
            hora_inicio,
            hora_fin,
            precio_total
        });
        
        res.status(201).json({ success: true, reserva: nuevaReserva });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al crear la reserva' });
    }
};



exports.getReservas = async (req, res) => {
    try {
        const userId = req.user.id; // Asumiendo que tienes el ID del usuario en req.user
        const reservas = await Reservaciones.findAll({
            where: { id_usuario: userId },
            include: [{ model: Salones }] // Incluyendo los detalles del salón si es necesario
        });
        
        res.render('User/reservation', { reservas });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las reservas');
    }
};
