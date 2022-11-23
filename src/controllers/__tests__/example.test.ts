import seed from './seed'
import app from '../../app'
import request from 'supertest'
import { BookModel } from '../../models/example.model'
import { disconnectDB } from '../../config/db.connect'

const testBook = {
	bookId: 7,
	title: 'test book',
	price: 777,
}

describe('example book model', () => {
	beforeAll(async () => {
		await BookModel.insertMany(seed)
	})

	afterAll(async () => {
		disconnectDB()
		process.exit(1)
	})

	beforeEach(async () => {
		await BookModel.deleteMany({
			title: 'test book',
		})
	})

	describe('GET /example/books', () => {
		it('should return all books', async () => {
			const res = await request(app).get('/example/books')

			expect(res.statusCode).toBe(200)
			expect(res.body).not.toBeNull()
		})
	})

	describe('GET /example/books/:id', () => {
		it('should return a book', async () => {
			const res = await request(app).get('/example/books/4')

			expect(res.statusCode).toBe(200)
			expect(res.body.title).toBe('mock book four')
		})
	})

	describe('POST /example/books', () => {
		it('shoud create a new book', async () => {
			const res = await request(app).post('/example/books').send(testBook)

			expect(res.statusCode).toBe(201)
			expect(res.body.bookId).toBe(7)
		})
	})

	describe('PATCH /example/books', () => {
		it('shoud update a book', async () => {
			await request(app).post('/example/books').send(testBook)

			const res = await request(app).patch('/example/books/7').send({
				price: 765,
			})

			expect(res.statusCode).toBe(200)
			expect(res.body.price).toBe(765)
		})
	})

	describe('DELETE /example/books/:id', () => {
		it('should delete a book', async () => {
			await request(app).post('/example/books').send(testBook)

			const res = await request(app).delete('/example/books/7')

			expect(res.statusCode).toBe(200)
		})
	})
})
