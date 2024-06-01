import { Router } from 'express'
import { getCategorias, postCategorias, putCategorias, deleteCategorias, getCategoria} from '../controllers/Categorias.controllers.js'

const router = Router()

router.get('/Categorias', getCategorias)

router.get('/Categorias/:id_categoria', getCategoria)

router.post('/Categorias', postCategorias)

router.put('/Categorias', putCategorias)

router.delete('/Categorias', deleteCategorias)

export default router