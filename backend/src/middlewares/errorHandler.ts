import { NextFunction, Request, Response } from 'express'

//executed when any middeware executes next(error)
export const errorHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
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
	// need to close the server on sigterm (in index.js)
}
