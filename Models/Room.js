// Modelo de salón

const Admin = require('./Admin'); // MOdelo del administrador
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ProyectoEventify', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

    const Salon = sequelize.define('Salon', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio_por_hora: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    precio_por_evento: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    imagenes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    id_admin: {
        type: DataTypes.INTEGER,
        references: {
            model: Admin,
            key: 'id'
        },
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
    tableName: 'Salones',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

module.exports = { Salon };
