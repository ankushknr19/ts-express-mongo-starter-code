import helmet from 'helmet'
import { PORT } from './config/env'
import createHttpError from 'http-errors'
import swaggerUi from 'swagger-ui-express'
import { connectDB } from './config/db.connect'
import logger from './middlewares/winstonLogger'
import rateLimiter from './middlewares/rateLimiter'
import exampleRoutes from './routes/example.routes'
import swaggerDocument from './swagger.example.json'
import morganLogger from './middlewares/morganLogger'
import { errorHandler } from './middlewares/errorHandler'
import express, { NextFunction, Request, Response } from 'express'

const app = express()

app.use(helmet())
app.use(rateLimiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morganLogger)

//api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//routes
app.use('/api/books', exampleRoutes)

//default route
app.get('/', (_req: Request, res: Response) =>
	res.status(200).send('server is running...')
)

//if route does not exist (unknown route)
app.use((_req: Request, _res: Response, next: NextFunction) => {
	next(new createHttpError.NotFound())
})

//donot use any middlewares after this errorHandler
app.use(errorHandler)

const server = app.listen(PORT, async () => {
	logger.info(`server running on http://localhost:${PORT}`)
	await connectDB()
})

process.on('SIGTERM', () => {
	server.close(() => logger.warn('process terminated'))
})
