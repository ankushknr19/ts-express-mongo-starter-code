import logger from './winstonLogger'
import { NextFunction, Request, Response } from 'express'

//executed when any middeware executes next(error)
//make sure this is the endpoint i.e. last middleware in app
export const errorHandler = (
	error: any,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.error(error.message)
	const status: number = error.isJoi ? 422 : error.status || 500
	const message: string =
		status === 500 ? 'Internal server error.' : error.message
	res.status(status).send({
		error: {
			status,
			message,
		},
	})
	next()
}
