// Modelo para Cambiar contraseña

module.exports = (sequelize, DataTypes) => {
    const restablecimientoContraseña = sequelize.define('restablecimientoContraseña', {
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
    timestamps: false
});

module.exports = {
    restablecimientocontraseña
};
}
