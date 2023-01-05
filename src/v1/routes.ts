import express from 'express'
import exampleRoutes from './example/example.routes'

const router = express.Router()

/* /api/v1/healthCheck*/
router.get('/healthCheck', (_req, res) => res.send('api v1 is working...'))

/* /api/v1/example/books */
router.use('/example/books', exampleRoutes)

export default router
