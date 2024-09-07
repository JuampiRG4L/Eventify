const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ProyectoEventify', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', 
});

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
        allowNull: true
    },
    proveedor: {
        type: DataTypes.ENUM('local', 'facebook'),
        allowNull: false,
        defaultValue: 'local'
    },
    id_proveedor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rol: {  // Añade este campo
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    tableName: 'Usuarios',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

module.exports = Usuario;