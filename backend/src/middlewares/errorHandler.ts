import { NextFunction, Request, Response } from 'express'
import logger from './winstonLogger'

//executed when any middeware executes next(error)
export const errorHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	logger.error(err.message)
	const status: number = err.status || 500
	const message: string =
		status === 500 ? 'Internal server error.' : err.message
	res.status(status).send({
		error: {
			status,
			message,
		},
	})
	next()
	//make sure this middleware is the last endpoint in the app
	//i.e. donot call any other middlewares after this one.
}
