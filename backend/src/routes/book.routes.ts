import express from 'express'
import {
	getAllBooks,
	getBook,
	createBook,
	deleteBook,
	updateBook,
} from '../controllers/book.controllers'

const router = express.Router()

router.route('/').get(getAllBooks).post(createBook)

router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook)

export default router
