import createHttpError from 'http-errors'
import * as exampleService from '../example.service'
import { NextFunction, Request, Response } from 'express'

//@desc get a book
//@route GET /api/example/books/:bookId
//@access public
export const getBookController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bookId = req.params.bookId
		const dbBook = await exampleService.getBook({ bookId })

		if (!dbBook) throw new createHttpError.NotFound('Book not found.')

		res.status(200).send(dbBook)
	} catch (error: any) {
		next(error)
	}
}
