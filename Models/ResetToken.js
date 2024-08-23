// Modelo para Cambiar contraseña

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RestablecimientoContraseña = sequelize.define('RestablecimientoContraseña', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    expiracion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    creado_en: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'RestablecimientoContraseña',
    timestamps: false // Solo tiene fecha de creación
});

module.exports = RestablecimientoContraseña;
