import seed from './seed'
import app from '../../../app'
import request from 'supertest'
import { BookModel } from '../example.model'
import {
	connectMonogoMemoryServer,
	disconnectMonogoMemoryServer,
} from '../../../__tests__/mongoMemoryServer.config'

describe('example book model', () => {
	beforeAll(async () => {
		await connectMonogoMemoryServer()
	})

	beforeEach(async () => {
		await BookModel.deleteMany()
	})

	afterAll(async () => {
		await disconnectMonogoMemoryServer()
	})

	describe('GET /api/v1/example/books', () => {
		it('should return all books', async () => {
			await BookModel.insertMany(seed)

			const res = await request(app).get('/api/v1/example/books')

			expect(res.statusCode).toBe(200)
			expect(res.body).not.toBeNull()
		})
	})

	describe('GET /api/v1/example/books/:bookId', () => {
		it('should return a book', async () => {
			await BookModel.insertMany(seed)

			const res = await request(app).get('/api/v1/example/books/4')

			expect(res.statusCode).toBe(200)
			expect(res.body.bookId).toBe(4)
		})
	})

	describe('POST /api/v1/example/books', () => {
		it('shoud create a new book', async () => {
			const res = await request(app)
				.post('/api/v1/example/books')
				.send(seed[0])

			expect(res.statusCode).toBe(201)
			expect(res.body.bookId).toBe(4)
		})
	})

	describe('PATCH /api/v1/example/books/:bookId', () => {
		it('shoud update a book', async () => {
			await request(app).post('/api/v1/example/books').send(seed[0])

			const res = await request(app).patch('/api/v1/example/books/4').send({
				price: 465,
			})

			expect(res.statusCode).toBe(200)
			expect(res.body.price).toBe(465)
		})
	})

	describe('DELETE /api/v1/example/books/:bookId', () => {
		it('should delete a book', async () => {
			await request(app).post('/api/v1/example/books').send(seed[0])

			const res = await request(app).delete('/api/v1/example/books/4')

			expect(res.statusCode).toBe(200)
		})
	})
})
