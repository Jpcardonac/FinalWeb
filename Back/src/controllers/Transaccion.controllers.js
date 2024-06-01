import { pool } from '../db.js';

// Obtener todas las transacciones
export const getTransaccion = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Transaccion');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching transactions from the database' });
    }
};

// Agregar una nueva transacción
export const postTransaccion = async (req, res) => {
    const { id_usuario, id_producto, monto, estado } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Transaccion (id_usuario, id_producto, monto, estado) VALUES (?, ?, ?, ?)',
            [id_usuario, id_producto, monto, estado]
        );

        const { insertId } = result;

        res.send({
            id_transaccion: insertId,
            id_usuario,
            id_producto,
            monto,
            estado
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error inserting transaction into the database' });
    }
};

// Eliminar una transacción
export const deleteTransaccion = async (req, res) => {
    const { id_transaccion } = req.body;
    try {
        const [result] = await pool.query('DELETE FROM Transaccion WHERE id_transaccion = ?', [id_transaccion]);
        if (result.affectedRows === 0) {
            res.status(404).send({ error: 'Transaction not found' });
        } else {
            res.send({ message: 'Transaction deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error deleting transaction from the database' });
    }
};

// Actualizar una transacción existente
export const putTransaccion = async (req, res) => {
    const { id_transaccion, id_usuario, id_producto, monto, estado } = req.body;
    try {
        // Verificar si la transacción existe
        const [transaction] = await pool.query('SELECT * FROM Transaccion WHERE id_transaccion = ?', [id_transaccion]);
        if (transaction.length === 0) {
            return res.status(404).send({ error: 'Transaction not found' });
        }

        // Actualizar la transacción
        await pool.query(
            'UPDATE Transaccion SET id_usuario = ?, id_producto = ?, monto = ?, estado = ? WHERE id_transaccion = ?',
            [id_usuario, id_producto, monto, estado, id_transaccion]
        );

        res.send({ message: 'Transaction updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error updating transaction in the database' });
    }
};