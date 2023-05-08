import { ZodError } from 'zod'
import logger from '../utils/winstonLogger'
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

	let status: number = error.status || 500
	let message: string = error.message

	if (error instanceof ZodError) {
		;(status = 422), (message = JSON.parse(message))
	}

	if (status === 500) message = 'Internal server error.'

	res.status(status).json({
		error: {
			status,
			message,
		},
	})
	next()
}
