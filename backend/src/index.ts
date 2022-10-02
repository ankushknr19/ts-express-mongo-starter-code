import helmet from 'helmet'
import { PORT } from './config/env'
import createHttpError from 'http-errors'
import { connectDB } from './config/db.connect'
import logger from './middlewares/winstonLogger'
import exampleRoutes from './routes/example.routes'
import morganLogger from './middlewares/morganLogger'
import { errorHandler } from './middlewares/errorHandler'
import express, { NextFunction, Request, Response } from 'express'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morganLogger)

connectDB()

app.use('/api/books', exampleRoutes)

app.get('/', (_req: Request, res: Response) =>
	res.status(200).send('server is running...')
)

//if route doesnot exit (unknown route)
app.use((_req: Request, _res: Response, next: NextFunction) => {
	next(new createHttpError.NotFound())
})

app.use(errorHandler)

const server = app.listen(PORT, () =>
	logger.info(`server running on http://localhost:${PORT}`)
)

process.on('SIGTERM', () => {
	server.close(() => logger.warn('process terminated'))
})
