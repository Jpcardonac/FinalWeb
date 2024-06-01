import { Router } from 'express'
import { getProductos, postProductos, putProductos, deleteProductos } from '../controllers/Productos.controllers.js'

const router = Router()

router.get('/Productos', getProductos)

router.post('/Productos', postProductos)

router.put('/Productos', putProductos)

router.delete('/Productos', deleteProductos)

export default router