import { NextFunction, Request, Response } from 'express'
import logger from './winstonLogger'

//executed when any middeware executes next(error)
//make sure this is the endpoint i.e. last middleware in app
export const errorHandler = (
	err: any,
	_req: Request,
	res: Response,
	next: NextFunction
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
}
