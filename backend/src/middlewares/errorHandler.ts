import { NextFunction, Request, Response } from 'express'
import logger from './winstonLogger'

//executed when any middeware executes next(error)
export const errorHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	logger.error(err)
	res.status(err.status || 500)
	res.send({
		error: {
			status: err.status || 500,
			message: err.message,
		},
	})
	// next()
	//no need to call next since it is the last point
	// but it will create error so
	// need to close the app on sigterm (in index.js)
}
