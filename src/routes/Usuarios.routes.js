import { Router } from 'express'
import { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } from '../controllers/Usuarios.controllers.js'

const router = Router()

router.get('/usuarios', getUsuarios)

router.post('/usuarios', postUsuarios)

router.put('/usuarios', putUsuarios)

router.delete('/usuarios', deleteUsuarios)

export default router