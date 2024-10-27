import { Router } from 'express'
import indexController from '../controllers/index.controller.js'
const router = Router()

/* GET home page. */
router.get('/', indexController)

export default router
