import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as listsCtrl from '../controllers/lists.js'

const router = Router({ mergeParams: true })

router.use(decodeUserFromToken)
router.get('/', checkAuth, listsCtrl.index)
router.get('/:listId', checkAuth, listsCtrl.show)
router.put('/:listId', checkAuth, listsCtrl.update)
router.post('/', checkAuth, listsCtrl.create)
router.delete('/:listId', checkAuth, listsCtrl.delete)

export { router }