import express from 'express'
import {
	getAllBooksController,
	getBookController,
	createBookController,
	deleteBookController,
	updateBookController,
} from '../controllers/example.controllers'

const router = express.Router()

router.route('/').get(getAllBooksController).post(createBookController)

router
	.route('/:id')
	.get(getBookController)
	.patch(updateBookController)
	.delete(deleteBookController)

export default router
