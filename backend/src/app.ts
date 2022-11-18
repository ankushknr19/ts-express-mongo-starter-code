import helmet from 'helmet'
import createHttpError from 'http-errors'
import swaggerUi from 'swagger-ui-express'
import exampleRoutes from './routes/example.routes'
import swaggerDocument from './swagger.example.json'
import morganLogger from './middlewares/morganLogger'
import { errorHandler } from './middlewares/errorHandler'
import express, { NextFunction, Request, Response } from 'express'
import rateLimiter from './middlewares/rateLimiter'

const app = express()

app.use(helmet())
app.use(rateLimiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morganLogger)

app.get('/', (_req: Request, res: Response) =>
	res.status(200).send(' server is running...')
)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/books', exampleRoutes)

//if route doesnot exit (unknown route)
app.use('*', (_req: Request, _res: Response, next: NextFunction) => {
	next(new createHttpError.NotFound())
})

app.use(errorHandler)

export default app
