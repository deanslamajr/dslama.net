import express from 'express'

import { get as getProjects } from './controllers/projects'
import { get as getPosts } from './controllers/posts'
import { get as getAbout } from './controllers/about'
import {
  get as getReadings,
  add as addReading } from './controllers/readings'

const router = express.Router()

router.get('/projects', getProjects)
router.get('/posts', getPosts)
router.get('/about', getAbout)

router.get('/readings', getReadings)
router.post('/readings', addReading)

export default router
