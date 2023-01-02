import express from 'express'
import {
	getBookController,
	getAllBooksController,
	createBookController,
	deleteBookController,
	updateBookController,
} from './controllers/index'
import { validate } from '../../middlewares/zodValidator'
import { createBookSchema, updateBookSchema } from './example.schema'

const router = express.Router()

/* /api/v1/example/books */
router
	.route('/')
	.get(getAllBooksController)
	.post(validate(createBookSchema), createBookController)

/* /api/v1/example/books/:bookId */
router
	.route('/:bookId')
	.get(getBookController)
	.patch(validate(updateBookSchema), updateBookController)
	.delete(deleteBookController)

export default router
