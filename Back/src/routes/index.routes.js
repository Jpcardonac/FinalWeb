import { Router } from 'express'
import {pool} from '../db.js'
import { getUsers } from '../controllers/Index.controllers.js';

const router = Router()

router.get('/Users', getUsers)

export default router