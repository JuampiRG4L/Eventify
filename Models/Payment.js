// Modelo para pagos
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ProyectoEventify', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

    const Pago = sequelize.define('Pago', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_reservacion: {
        type: DataTypes.INTEGER,
        references: {
            model: Reservacion,
            key: 'id'
        },
        allowNull: false
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    metodo_pago: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado_pago: {
        type: DataTypes.ENUM('pendiente', 'completado', 'fallido'),
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
    tableName: 'Pagos',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

module.exports ={
    Pago
};

