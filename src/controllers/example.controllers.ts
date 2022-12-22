import createHttpError from 'http-errors'
import { BookModel } from '../models/example.model'
import { NextFunction, Request, Response } from 'express'
import { createBookSchema, updateBookSchema } from '../schemas/example.schema'
import * as exampleServices from '../services/example.services'

//@desc get all books
//@route GET /api/books
//@access public
export const getAllBooksController = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const dbBooks = await exampleServices.getAllBooks()

		//donot use "!dbBooks" as find() query sends empty array i.e.[] if no data found
		if (dbBooks.length === 0)
			throw new createHttpError.NotFound('Books not found.')

		res.status(200).send(dbBooks)
	} catch (error: any) {
		//go to errorHandler middleware
		next(error)
	}
}

//@desc get a book
//@route GET /api/books/:id
//@access public
export const getBookController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bookId = req.params.id
		const dbBook = await exampleServices.getBook({ bookId })

		if (!dbBook) throw new createHttpError.NotFound('Book not found.')

		res.status(200).send(dbBook)
	} catch (error: any) {
		//go to errorHandler middleware
		next(error)
	}
}

//@desc create a new book
//@route POST /api/books
//@access public

export const createBookController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//validate incoming data
		const createInputs = await createBookSchema.validateAsync(req.body)

		//destructure data
		const { bookId, title, price } = createInputs

		//check if book with given id already exists
		const checkDB = await BookModel.findOne({ bookId })
		if (checkDB)
			throw new createHttpError.Conflict(
				`book with id=${bookId} already exists.`
			)

		//save in database
		const newBook = await exampleServices.createBook({
			bookId,
			title,
			price,
		})

		res.status(201).send(newBook)
	} catch (error: any) {
		next(error)
	}
}

//@desc update a book
//@route PUT /api/books/id
//@access public
export const updateBookController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bookId = req.params.id
		const updateInputs = await updateBookSchema.validateAsync(req.body)

		const dbBook = await BookModel.findOne({ bookId })

		if (!dbBook) throw new createHttpError.NotFound('Book not found.')

		const updatedBook = await exampleServices.updateBook(
			{ _id: dbBook._id },
			updateInputs
		)

		res.status(200).send(updatedBook)
	} catch (error: any) {
		next(error)
	}
}

//@desc delete a book
//@route DELETE /api/books/id
//@access public
export const deleteBookController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bookId = req.params.id
		const dbBook = await BookModel.findOne({ bookId })

		if (!dbBook) throw new createHttpError.NotFound('Book not found')

		await exampleServices.deleteBook({ _id: dbBook._id })

		res.status(200).end()
	} catch (error: any) {
		next(error)
	}
}
