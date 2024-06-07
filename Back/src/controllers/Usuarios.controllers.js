import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'tu-email@gmail.com', // correo
        pass: 'tu-contraseña', // contraseña de correo
    },
});

export const getUsuarios = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching users from the database' });
    }
};

export const postUsuarios = async (req, res) => {
    const { nombre, apellido, email, telefono, direccion, ciudad, estado, pais, rol } = req.body;
    try {
        // Generar una contraseña aleatoria
        const generatedPassword = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, email, telefono, direccion, ciudad, estado, pais, rol, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [nombre, apellido, email, telefono, direccion, ciudad, estado, pais, rol, hashedPassword]
        );

        const [user] = await pool.query('SELECT id_usuario FROM usuarios WHERE email = ?', [email]);
        const { id_usuario } = user[0];

        // Enviar la contraseña generada al correo del usuario
        const mailOptions = {
            from: 'tu-email@gmail.com', // correo
            to: email,
            subject: 'Bienvenido a nuestra tienda!!',
            text: `Hola ${nombre},\n\nTu cuenta ha sido creada exitosamente. Aquí están tus credenciales de inicio de sesión:\n\nID de Usuario: ${id_usuario}\nContraseña: ${generatedPassword}\n\nPor favor, disfruta al máximo esta experiencia.\n\nSaludos,\nde un colega.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).send({ error: 'Error al mandar el correo' });
            }
            console.log('Correo enviado:', info.response);
        });

        res.send({
            success: true,
            id_usuario,
            nombre,
            apellido,
            email,
            telefono,
            direccion,
            ciudad,
            estado,
            pais,
            rol
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error inserting user into the database' });
    }
};

export const deleteUsuarios = async (req, res) => {
    const { id_usuario } = req.body;
    try {
        const [result] = await pool.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id_usuario]);
        if (result.affectedRows === 0) {
            res.status(404).send({ error: 'User not found' });
        } else {
            res.send({ message: 'User deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error deleting user from the database' });
    }
};

export const putUsuarios = async (req, res) => {
    const { id_usuario, nombre, apellido, email, contrasena, telefono, direccion, ciudad, estado, pais, rol } = req.body;
    try {
        const [user] = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id_usuario]);
        if (user.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        await pool.query(
            'UPDATE Usuarios SET nombre = ?, apellido = ?, email = ?, contrasena = ?, telefono = ?, direccion = ?, ciudad = ?, estado = ?, pais = ?, rol = ? WHERE id_usuario = ?',
            [nombre, apellido, email, hashedPassword, telefono, direccion, ciudad, estado, pais, rol, id_usuario]
        );

        res.send({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error updating user in the database' });
    }
};

export const loginUsuario = async (req, res) => {
    const { id_usuario, contrasena } = req.body;
    try {
        // Verificar si el usuario existe
        const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id_usuario]);
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Usuario incorrecto' });
        }

        const usuario = rows[0];

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};


export const recuperarContrasena = async (req, res) => {
    const { id_usuario, email } = req.body;
    try {
        // Verificar si el usuario existe
        const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = ? AND email = ?', [id_usuario, email]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        const usuario = rows[0];

        // Generar una nueva contraseña aleatoria
        const nuevaContrasena = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

        // Actualizar la contraseña en la base de datos
        await pool.query('UPDATE Usuarios SET contrasena = ? WHERE id_usuario = ?', [hashedPassword, id_usuario]);

        // Enviar la nueva contraseña al correo del usuario
        const mailOptions = {
            from: 'tu-email@gmail.com',
            to: email,
            subject: 'Recuperación de Contraseña',
            text: `Hola ${usuario.nombre},\n\nSe ha generado una nueva contraseña para tu cuenta. Aquí están tus nuevas credenciales de inicio de sesión:\n\nID de Usuario: ${id_usuario}\nNueva Contraseña: ${nuevaContrasena}\n\nSaludos,\ntu Equipo de confianza.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).json({ success: false, message: 'Error al mandar el correo' });
            }
            console.log('Correo enviado:', info.response);
        });

        res.status(200).json({ success: true, message: 'Contraseña actualizada y enviada por correo' });
    } catch (error) {
        console.error('Error al recuperar la contraseña:', error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};