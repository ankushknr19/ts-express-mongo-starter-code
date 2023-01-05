import createHttpError from 'http-errors'
import { BookModel } from '../example.model'
import * as exampleService from '../example.service'
import { NextFunction, Request, Response } from 'express'

//@desc create a new book
//@route POST /api/v1/example/books
//@access public

export const createBookController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//destructure incoming data
		const { bookId, title, price } = req.body

		//check if book with given id already exists
		const checkDB = await BookModel.findOne({ bookId })
		if (checkDB)
			throw new createHttpError.Conflict(
				`book with id=${bookId} already exists.`
			)

		//save in database
		const newBook = await exampleService.createBook({
			bookId,
			title,
			price,
		})

		res.status(201).send(newBook)
	} catch (error: any) {
		next(error)
	}
}
