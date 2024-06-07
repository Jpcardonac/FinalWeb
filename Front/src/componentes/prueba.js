import bcrypt from 'bcryptjs';
import { pool } from './db.js';

const crearUsuarioDePrueba = async () => {
    const contrasenaEnTextoPlano = 'tu_contrasena';
    const contrasenaHasheada = await bcrypt.hash(contrasenaEnTextoPlano, 10);

    const usuario = {
        id_usuario: '2ae5476d-1f81-11ef-b04f-b4a9fccee1e7',
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@example.com',
        contrasena: contrasenaHasheada,
        telefono: '123456789',
        direccion: 'Calle Falsa 123',
        ciudad: 'Ciudad Ejemplo',
        estado: 'Estado Ejemplo',
        pais: 'País Ejemplo',
        rol: 'admin',
        activo: 1,
    };

    try {
        await pool.query(
            'INSERT INTO Usuarios (id_usuario, nombre, apellido, email, contrasena, telefono, direccion, ciudad, estado, pais, rol, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                usuario.id_usuario,
                usuario.nombre,
                usuario.apellido,
                usuario.email,
                usuario.contrasena,
                usuario.telefono,
                usuario.direccion,
                usuario.ciudad,
                usuario.estado,
                usuario.pais,
                usuario.rol,
                usuario.activo,
            ]
        );
        console.log('Usuario de prueba creado con éxito');
    } catch (error) {
        console.error('Error al crear usuario de prueba:', error);
    }
};

crearUsuarioDePrueba();
