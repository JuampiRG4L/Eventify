//Modelo de reservación
const Usuario = require('./User'); // Modelo de Usuario
const Salon = require('./Room'); // Modelo de Salon

module.exports = (sequelize, DataTypes) => {
    const Reservacion = sequelize.define('Reservacion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        },
        allowNull: false
    },
    id_salon: {
        type: DataTypes.INTEGER,
        references: {
            model: Salon,
            key: 'id'
        },
        allowNull: false
    },
    tipo_evento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_de_personas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    precio_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'confirmado', 'cancelado'),
        defaultValue: 'pendiente',
        allowNull: false
    },
    creado_en: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    actualizado_en: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Reservaciones',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

module.exports = {
    Reservacion
};
}
