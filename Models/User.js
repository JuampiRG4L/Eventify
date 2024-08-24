// Modelo de usuario

const { DataTypes } = require('Sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: true // Permite null para usuarios que se registren mediante Facebook
    },
    proveedor: {
        type: DataTypes.ENUM('local', 'facebook'),
        allowNull: false,
        defaultValue: 'local'
    },
    id_proveedor: {
        type: DataTypes.STRING,
        allowNull: true // Solo se usa si el proveedor no es 'local'
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
    tableName: 'Usuarios',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

module.exports = Usuario;
