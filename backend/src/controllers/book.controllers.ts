//@desc get all books
//@route GET /api/books
//@access public

import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { BookModel } from '../models/book.model'
import { createBookSchema, updateBookSchema } from '../schemas/book.schema'

export const getAllBooks = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const books = await BookModel.find()

		//find() sends empty array i.e.[] if no data found
		if (books.length === 0)
			throw new createHttpError.NotFound('No books found.')

		res.status(200).send(books)
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
		const book = await BookModel.findOne({ bookId })

		if (!book) throw new createHttpError.NotFound('No book found.')

		res.status(200).send(book)
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
		const result = await createBookSchema.validateAsync(req.body)

		//destructure data
		const { bookId, title, price } = result

		//check if book with given id already exists
		const checkDB = await BookModel.findOne({ bookId })
		if (checkDB)
			throw new createHttpError.Conflict(
				`book with id=${bookId} already exists`
			)

		//save in database
		const newBook = await BookModel.create({
			bookId,
			title,
			price,
		})

		res.status(201).send({
			message: 'new book created successfully.',
			'new book': newBook,
		})
	} catch (error: any) {
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
		const result = await updateBookSchema.validateAsync(req.body)
		const { title, price } = result

		const book = await BookModel.findOne({ bookId })

		if (!book) throw new createHttpError.NotFound('No book found')

		await BookModel.updateOne({ bookId }, { $set: { title, price } })

		const updatedBook = await BookModel.findOne({ bookId })

		res.status(200).send({
			message: 'book updated successfully.',
			'updated book': updatedBook,
		})
	} catch (error: any) {
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
		const book = await BookModel.findOne({ bookId })

		if (!book) throw new createHttpError.NotFound('No book found')

		await BookModel.deleteOne({ id: book.id })

		res.status(200).send(`book id=${bookId} deleted successfully.`)
	} catch (error: any) {
		next(error)
	}
}
