import express from 'express'

import api from './api'

import { logout } from './controllers/logout'
import { isAuthenticated } from './controllers/status'
import { authenticateUser } from './controllers/login'
import renderComponent from './controllers/render-component'

const router = express.Router()

router.use('/api', api)

router.post('/login', authenticateUser)
router.post('/logout', logout)
router.get('/status/authentication', isAuthenticated)

router.get('*', renderComponent)

export default router
