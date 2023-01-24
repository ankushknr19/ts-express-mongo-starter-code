import express from 'express'
import * as c from './controllers/index'
import { validate } from '../../middlewares/zodValidator'
import { createBookSchema, updateBookSchema } from './example.validation.schema'

const router = express.Router()

//@desc get all books
//@route GET /api/v1/example/books
//@access public
router.get(
	'/',
	c.getAllBooksController
	/*@swagger
		#swagger.tags = ['Example Books']
		#swagger.summary = 'Get all books' 
		#swagger.responses[200] = {description: 'Books fetched successfully'},
		#swagger.responses[404] = {description: 'Books not found'}
	*/
)

//@desc create a new book
//@route POST /api/v1/example/books
//@access public
router.post(
	'/',
	validate(createBookSchema),
	c.createBookController
	/*@swagger
		#swagger.tags = ['Example Books']
		#swagger.summary = 'Create a new book' 
		#swagger.requestBody = { required: true, 
			content: { "application/json": { schema: { $ref: "#/components/schemas/createBook" }}}} 
		#swagger.responses[201] = {description: 'Book created successfully'},
		#swagger.responses[422] = {description: 'Validation error'},
		#swagger.responses[409] = {description: 'Book with given id already exists'}
	*/
)

//@desc get a book
//@route GET /api/v1/example/books/:bookId
//@access public
router.get(
	'/:bookId',
	c.getBookController
	/*@swagger
		#swagger.tags = ['Example Books']
		#swagger.summary = 'Get a book' 
		#swagger.responses[200] = {description: 'Book fetched successfully'},
		#swagger.responses[404] = {description: 'Book with given id not found'}
	*/
)

//@desc update a book
//@route PUT /api/v1/example/books/:bookId
//@access public
router.patch(
	'/:bookId',
	validate(updateBookSchema),
	c.updateBookController
	/*@swagger
		#swagger.tags = ['Example Books']
		#swagger.summary = 'Update a book' 
		#swagger.requestBody = { required: true, 
			content: { "application/json": { schema: { $ref: "#/components/schemas/updateBook" }}}} 
		#swagger.responses[200] = {description: 'Book updated successfully'},
		#swagger.responses[422] = {description: 'Validation error'},
		#swagger.responses[404] = {description: 'Book with given id not found'}
	*/
)

//@desc delete a book
//@route DELETE /api/v1/example/books/:bookId
//@access public
router.delete(
	'/:bookId',
	c.deleteBookController
	/*@swagger
		#swagger.tags = ['Example Books']
		#swagger.summary = 'Delete a book' 
		#swagger.responses[200] = {description: 'Book deleted successfully'},
		#swagger.responses[404] = {description: 'Book with given id not found'}
	*/
)

export default router
