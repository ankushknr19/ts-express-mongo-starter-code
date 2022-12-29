import express from 'express'
import {
	getAllBooksController,
	getBookController,
	createBookController,
	deleteBookController,
	updateBookController,
} from '../controllers/example.controllers'
import validate from '../middlewares/zodValidator'
import { createBookSchema, updateBookSchema } from '../schemas/example.schema'

const router = express.Router()

/* example/books */
router
	.route('/')
	.get(getAllBooksController)
	.post(validate(createBookSchema), createBookController)

/* example/books/:bookId */
router
	.route('/:bookId')
	.get(getBookController)
	.patch(validate(updateBookSchema), updateBookController)
	.delete(deleteBookController)

export default router
