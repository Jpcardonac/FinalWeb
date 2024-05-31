import { Router } from 'express'
import { getTransaccion, postTransaccion, putTransaccion, deleteTransaccion } from '../controllers/Transaccion.controllers.js'

const router = Router()

router.get('/Transaccion', getTransaccion)

router.post('/Transaccion', postTransaccion)

router.put('/Transaccion', putTransaccion)

router.delete('/Transaccion', deleteTransaccion)

export default router