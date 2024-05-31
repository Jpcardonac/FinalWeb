CREATE DATABASE dbaProyectoWeb;
USE dbaProyectoWeb;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    ciudad VARCHAR(50),
    estado VARCHAR(50),
    pais VARCHAR(50),
    fecha_registro DATETIME DEFAULT GETDATE(),
    rol VARCHAR(20) NOT NULL,
    activo BIT DEFAULT 1
);

-- Resto de las tablas
CREATE TABLE Categorias (
    id_categoria INT PRIMARY KEY IDENTITY(1,1),
    nombre_categoria VARCHAR(100) NOT NULL,
    activo BIT DEFAULT 1
);

CREATE TABLE Productos (
    id_producto INT PRIMARY KEY IDENTITY(1,1),
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    id_categoria INT,
    id_usuario UNIQUEIDENTIFIER,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    activo BIT DEFAULT 1,
    FOREIGN KEY (id_categoria) REFERENCES Categorñas(id_categoria),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE Transaccion (
    id_transaccion INT PRIMARY KEY IDENTITY(1,1),
    id_usuario UNIQUEIDENTIFIER,
    id_producto INT,
    fecha_transaccion DATETIME DEFAULT GETDATE(),
    monto DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    activo BIT DEFAULT 1,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);