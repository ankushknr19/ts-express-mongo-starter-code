import { AnyZodObject } from 'zod'
import { NextFunction, Request, Response } from 'express'

type Location = 'params' | 'query' | 'body'

export const validate =
	(schema: AnyZodObject, location: Location = 'body') =>
	(req: Request, _res: Response, next: NextFunction) => {
		try {
			switch (location) {
				case 'query':
					schema.parse(req.query)
					break
				case 'params':
					schema.parse(req.params)
					break
				case 'body':
					schema.parse(req.body)
			}

			next()
		} catch (error: any) {
			next(error)
		}
	}
