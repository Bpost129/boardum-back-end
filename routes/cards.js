import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as cardsCtrl from '../controllers/cards.js'

const router = Router({ mergeParams: true })

router.use(decodeUserFromToken)
router.get('/', checkAuth, cardsCtrl.index)
router.get('/:cardId', checkAuth, cardsCtrl.show)
router.put('/:cardId', checkAuth, cardsCtrl.update)
router.post('/', checkAuth, cardsCtrl.create)
router.delete('/:listId', checkAuth, cardsCtrl.delete)

export { router }