import { pool } from '../db.js';

// Obtener todas las categorías
export const getCategorias = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Categorias');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching categories from the database' });
    }
};

export const getCategoria = async (req, res) => {
    const { id_categoria } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM Categorias WHERE id_categoria = ?', [id_categoria]);
        if (result.length === 0) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.json(result[0]); // Retorna solo la primera fila del resultado, ya que debería haber solo una categoría con el mismo id_categoria
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching category from the database' });
    }
    console.log(req.params)
};


// Agregar una nueva categoría
export const postCategorias = async (req, res) => {
    const { nombre_categoria } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Categorias (nombre_categoria) VALUES (?)',
            [nombre_categoria]
        );

        const { insertId } = result;

        res.send({
            id_categoria: insertId,
            nombre_categoria
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error inserting category into the database' });
    }
};

// Eliminar una categoría
export const deleteCategorias = async (req, res) => {
    const { id_categoria } = req.body;
    try {
        const [result] = await pool.query('DELETE FROM Categorias WHERE id_categoria = ?', [id_categoria]);
        if (result.affectedRows === 0) {
            res.status(404).send({ error: 'Category not found' });
        } else {
            res.send({ message: 'Category deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error deleting category from the database' });
    }
};

// Actualizar una categoría existente
export const putCategorias = async (req, res) => {
    const { id_categoria, nombre_categoria } = req.body;
    try {
        // Verificar si la categoría existe
        const [category] = await pool.query('SELECT * FROM Categorias WHERE id_categoria = ?', [id_categoria]);
        if (category.length === 0) {
            return res.status(404).send({ error: 'Category not found' });
        }

        // Actualizar la categoría
        await pool.query(
            'UPDATE Categorias SET nombre_categoria = ? WHERE id_categoria = ?',
            [nombre_categoria, id_categoria]
        );

        res.send({ message: 'Category updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error updating category in the database' });
    }
};