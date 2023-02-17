import helmet from 'helmet'
import v1routes from './v1/routes'
import createHttpError from 'http-errors'
import swaggerUi from 'swagger-ui-express'
import morganLogger from './utils/morganLogger'
import swaggerDocument from './swagger_output.json'
import { rateLimiter } from './middlewares/rateLimiter'
import { errorHandler } from './middlewares/errorHandler'
import express, { NextFunction, Request, Response } from 'express'

const app = express()

//application-level middlewares
app.disable('x-powered-by')
app.use(helmet())
app.use(rateLimiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morganLogger)

//home route
app.get('/', (_req: Request, res: Response) => {
	res.send(
		'<span>Server is running!! Find api docs here - <a href="/api/docs">API DOCS</a></span>'
	)
})

//api health-check route
app.get('/api/healthCheck', (_req: Request, res: Response) => {
	res.status(200).send('api is working...')
})

//api documentation route
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//api v1 route
app.use('/api/v1', v1routes)

//if url does not exit (unknown route)
app.use('*', (_req: Request, _res: Response, next: NextFunction) => {
	next(new createHttpError.NotFound())
})

//last middleware
app.use(errorHandler)

export default app
