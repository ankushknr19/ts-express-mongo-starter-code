import { AnyZodObject } from 'zod'
import createHttpError from 'http-errors'
import { fromZodError } from 'zod-validation-error'
import { NextFunction, Request, Response } from 'express'

export const validate =
	(schema: AnyZodObject) =>
	(req: Request, _res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			})

			next()
		} catch (error: any) {
			const readableZodErrorMessage = fromZodError(error)
				.toString()
				.replace('Error: ', '')

			next(new createHttpError.UnprocessableEntity(readableZodErrorMessage))
		}
	}
