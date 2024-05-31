import {pool} from '../db.js'

export const getUsers = async (req,res) => {
    const [result] = await pool.query('SELECT * FROM Usuarios')
    res.json(result)}