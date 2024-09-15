CREATE DATABASE ProyectoEventify;

USE ProyectoEventify;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    proveedor ENUM('local', 'facebook') NOT NULL,
    id_proveedor VARCHAR(255),
    rol ENUM('usuario', 'admin') DEFAULT 'usuario',  -- Cambié a 'admin' para consistencia
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    proveedor ENUM('local', 'facebook') NOT NULL,  -- Agregado para consistencia con el modelo
    id_proveedor VARCHAR(255),  -- Agregado para consistencia con el modelo
    rol ENUM('usuario', 'admin') NOT NULL,  -- Cambié a 'admin' para consistencia
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE salones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    capacidad INT NOT NULL,
    lat DECIMAL(10, 7) NOT NULL,
    lng DECIMAL(10, 7) NOT NULL,
    cocina BOOLEAN DEFAULT 0,
    wifi BOOLEAN DEFAULT 0,
    estacionamiento BOOLEAN DEFAULT 0,
    guardaObjetos BOOLEAN DEFAULT 0,
    jardin BOOLEAN DEFAULT 0,
    balcon BOOLEAN DEFAULT 0,
    decoracion BOOLEAN DEFAULT 0,
    sonido BOOLEAN DEFAULT 0,
    banos BOOLEAN DEFAULT 0,
    movilidad BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE Reservaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_salon INT,
    tipo_evento VARCHAR(255) NOT NULL,
    numero_de_personas INT NOT NULL,
    hora_inicio DATETIME NOT NULL,
    hora_fin DATETIME NOT NULL,
    precio_total DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'confirmado', 'cancelado') DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    FOREIGN KEY (id_salon) REFERENCES Salones(id)
);

CREATE TABLE Pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_reservacion INT,
    monto DECIMAL(10, 2) NOT NULL,
    metodo_pago VARCHAR(255) NOT NULL,
    estado_pago ENUM('pendiente', 'completado', 'fallido') DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_reservacion) REFERENCES Reservaciones(id)
);

CREATE TABLE RestablecimientoContraseña (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiracion TIMESTAMP NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
