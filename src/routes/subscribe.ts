import { Router } from 'express'

import {
  subscribe,
  unsubscribe,
  getSubscriptions,
} from '../controllers/subscribe'

const router = Router()

router.post('/subscribe', subscribe)
router.post('/unsubscribe', unsubscribe)
router.get('/subscriptions', getSubscriptions)

export default router
