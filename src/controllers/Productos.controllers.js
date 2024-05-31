import { pool } from '../db.js';

// Obtener todos los productos
export const getProductos = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Productos');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching products from the database' });
    }
};

// Agregar un nuevo producto
export const postProductos = async (req, res) => {
    const { nombre_producto, descripcion, precio, id_categoria, id_usuario } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Productos (nombre_producto, descripcion, precio, id_categoria, id_usuario) VALUES (?, ?, ?, ?, ?)',
            [nombre_producto, descripcion, precio, id_categoria, id_usuario]
        );

        const { insertId } = result;

        res.send({
            id_producto: insertId,
            nombre_producto,
            descripcion,
            precio,
            id_categoria,
            id_usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error inserting product into the database' });
    }
};

// Eliminar un producto
export const deleteProductos = async (req, res) => {
    const { id_producto } = req.body;
    try {
        const [result] = await pool.query('DELETE FROM Productos WHERE id_producto = ?', [id_producto]);
        if (result.affectedRows === 0) {
            res.status(404).send({ error: 'Product not found' });
        } else {
            res.send({ message: 'Product deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error deleting product from the database' });
    }
};

// Actualizar un producto existente
export const putProductos = async (req, res) => {
    const { id_producto, nombre_producto, descripcion, precio, id_categoria, id_usuario } = req.body;
    try {
        // Verificar si el producto existe
        const [product] = await pool.query('SELECT * FROM Productos WHERE id_producto = ?', [id_producto]);
        if (product.length === 0) {
            return res.status(404).send({ error: 'Product not found' });
        }

        // Actualizar el producto
        await pool.query(
            'UPDATE Productos SET nombre_producto = ?, descripcion = ?, precio = ?, id_categoria = ?, id_usuario = ? WHERE id_producto = ?',
            [nombre_producto, descripcion, precio, id_categoria, id_usuario, id_producto]
        );

        res.send({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error updating product in the database' });
    }
};
