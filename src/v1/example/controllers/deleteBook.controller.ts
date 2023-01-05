import createHttpError from 'http-errors'
import { BookModel } from '../example.model'
import * as exampleService from '../example.service'
import { NextFunction, Request, Response } from 'express'

//@desc delete a book
//@route DELETE /api/v1/example/books/:bookId
//@access public
export const deleteBookController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bookId = req.params.bookId
		const dbBook = await BookModel.findOne({ bookId })

		if (!dbBook) throw new createHttpError.NotFound('Book not found')

		await exampleService.deleteBook({ _id: dbBook._id })

		res.status(200).end()
	} catch (error: any) {
		next(error)
	}
}
