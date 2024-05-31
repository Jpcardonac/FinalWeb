import {pool} from '../db.js'

export const getUsuarios = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Usuarios');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching users from the database' });
    }
};

export const postUsuarios = async (req, res) => {
    const { nombre, apellido, email, telefono, direccion, ciudad, estado, pais, rol } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Usuarios (nombre, apellido, email, telefono, direccion, ciudad, estado, pais, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [nombre, apellido, email, telefono, direccion, ciudad, estado, pais, rol]
        );

        // Obtener el id_usuario del usuario recién insertado
        const [user] = await pool.query('SELECT id_usuario FROM Usuarios WHERE email = ?', [email]);
        const { id_usuario } = user[0];

        res.send({
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
        // Verificar si el usuario existe
        const [user] = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id_usuario]);
        if (user.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Actualizar el usuario
        await pool.query(
            'UPDATE Usuarios SET nombre = ?, apellido = ?, email = ?, contrasena = ?, telefono = ?, direccion = ?, ciudad = ?, estado = ?, pais = ?, rol = ? WHERE id_usuario = ?',
            [nombre, apellido, email, contrasena, telefono, direccion, ciudad, estado, pais, rol, id_usuario]
        );

        res.send({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error updating user in the database' });
    }
};
