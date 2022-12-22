import { BookDocument, BookModel } from '../models/example.model'
import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
	UpdateQuery,
} from 'mongoose'

//get all books from database
export async function getAllBooks(options: QueryOptions = { lean: true }) {
	return BookModel.find({}, {}, options)
}

//get a book from database
export async function getBook(
	query: FilterQuery<BookDocument>,
	options: QueryOptions = { lean: true }
) {
	return BookModel.findOne(query, {}, options)
}

//create a new book in database
export async function createBook(input: DocumentDefinition<BookDocument>) {
	return BookModel.create(input)
}

//update a book in database
export async function updateBook(
	query: FilterQuery<BookDocument>,
	update: UpdateQuery<BookDocument>,
	options: QueryOptions = { new: true }
) {
	return BookModel.findOneAndUpdate(query, update, options)
}

//delete a book in database
export async function deleteBook(query: FilterQuery<BookDocument>) {
	return BookModel.deleteOne(query)
}
