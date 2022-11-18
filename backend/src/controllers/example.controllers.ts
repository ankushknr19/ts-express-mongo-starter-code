import createHttpError from 'http-errors'
import { BookModel } from '../models/example.model'
import { NextFunction, Request, Response } from 'express'
import { createBookSchema, updateBookSchema } from '../schemas/example.schema'

//@desc get all books
//@route GET /api/books
//@access public
export const getAllBooks = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const dbBooks = await BookModel.find()

		//find() sends empty array i.e.[] if no data found
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
export const getBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bookId = req.params.id
		const dbBook = await BookModel.findOne({ bookId })

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
export const createBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//validate incoming data
		const reqBody = await createBookSchema.validateAsync(req.body)

		//destructure data
		const { bookId, title, price } = reqBody

		//check if book with given id already exists
		const checkDB = await BookModel.findOne({ bookId })
		if (checkDB)
			throw new createHttpError.Conflict(
				`book with id=${bookId} already exists.`
			)

		//save in database
		const newBook = await BookModel.create({
			bookId,
			title,
			price,
		})

		res.status(201).send(newBook)
	} catch (error: any) {
		if (error.isJoi) error.status = 422
		next(error)
	}
}

//@desc update a book
//@route PUT /api/books/id
//@access public
export const updateBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bookId = req.params.id
		const reqBody = await updateBookSchema.validateAsync(req.body)

		const dbBook = await BookModel.findOne({ bookId })

		if (!dbBook) throw new createHttpError.NotFound('Book not found.')

		const updatedBook = await BookModel.findOneAndUpdate(
			{ _id: dbBook._id },
			reqBody,
			{
				new: true,
			}
		)

		res.status(200).send(updatedBook)
	} catch (error: any) {
		if (error.isJoi) error.status = 422
		next(error)
	}
}

//@desc delete a book
//@route DELETE /api/books/id
//@access public
export const deleteBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bookId = req.params.id
		const dbBook = await BookModel.findOne({ bookId })

		if (!dbBook) throw new createHttpError.NotFound('Book not found')

		await BookModel.deleteOne({ _id: dbBook._id })

		res.status(200).send(`book id=${bookId} deleted successfully.`)
	} catch (error: any) {
		next(error)
	}
}
