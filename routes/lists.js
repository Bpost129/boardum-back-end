import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as listsCtrl from '../controllers/lists.js'

const router = Router({ mergeParams: true })

router.use(decodeUserFromToken)
router.get('/', checkAuth, listsCtrl.index)
router.post('/', checkAuth, listsCtrl.create)

export { router }