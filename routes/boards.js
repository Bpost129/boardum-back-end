import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as boardsCtrl from '../controllers/boards.js'

const router = Router()

router.use(decodeUserFromToken)
router.get('/', checkAuth, boardsCtrl.index)
router.get('/:boardId', checkAuth, boardsCtrl.show)
router.post('/', checkAuth, boardsCtrl.create)

export { router }