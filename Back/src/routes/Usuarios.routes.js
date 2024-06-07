import { Router } from 'express';
import { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, recuperarContrasena, loginUsuario } from '../controllers/Usuarios.controllers.js';


const router = Router();

router.get('/usuarios', getUsuarios);
router.post('/usuarios', postUsuarios);
router.put('/usuarios', putUsuarios);
router.delete('/usuarios', deleteUsuarios);
router.post('/login', loginUsuario);
router.post('/recuperar-contrasena', recuperarContrasena);

export default router;
