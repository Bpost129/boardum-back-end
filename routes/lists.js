import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as listsCtrl from '../controllers/lists.js'

const router = Router()

router.get('/', checkAuth, listsCtrl.index)

export { router }