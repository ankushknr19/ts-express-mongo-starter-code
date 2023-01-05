import createHttpError from 'http-errors'
import * as exampleService from '../example.service'
import { NextFunction, Request, Response } from 'express'
import { BookModel } from '../example.model'

//@desc update a book
//@route PUT /api/v1/example/books/:bookId
//@access public
export const updateBookController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bookId = req.params.bookId
		const updateInputs = req.body

		const dbBook = await BookModel.findOne({ bookId })

		if (!dbBook) throw new createHttpError.NotFound('Book not found.')

		const updatedBook = await exampleService.updateBook(
			{ _id: dbBook._id },
			updateInputs
		)

		res.status(200).send(updatedBook)
	} catch (error: any) {
		next(error)
	}
}
