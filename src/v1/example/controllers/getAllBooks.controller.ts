import createHttpError from 'http-errors'
import * as exampleService from '../example.service'
import { NextFunction, Request, Response } from 'express'

//@desc get all books
//@route GET /api/v1/example/books
//@access public
export const getAllBooksController = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const dbBooks = await exampleService.getAllBooks()

		//donot use "!dbBooks" as find() query sends empty array i.e.[] if no data found
		if (dbBooks.length === 0)
			throw new createHttpError.NotFound('Books not found.')

		res.status(200).send(dbBooks)
	} catch (error: any) {
		//go to errorHandler middleware
		next(error)
	}
}
