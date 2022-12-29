import app from '../app'
import seed from './seed'
import request from 'supertest'
import { BookModel } from '../models/example.model'
import {
	connectMonogoMemoryServer,
	disconnectMonogoMemoryServer,
} from './config/mongoMemoryServer'

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

	describe('GET /example/books', () => {
		it('should return all books', async () => {
			await BookModel.insertMany(seed)

			const res = await request(app).get('/example/books')

			expect(res.statusCode).toBe(200)
			expect(res.body).not.toBeNull()
		})
	})

	describe('GET /example/books/:bookId', () => {
		it('should return a book', async () => {
			await BookModel.insertMany(seed)

			const res = await request(app).get('/example/books/4')

			expect(res.statusCode).toBe(200)
			expect(res.body.bookId).toBe(4)
		})
	})

	describe('POST /example/books', () => {
		it('shoud create a new book', async () => {
			const res = await request(app).post('/example/books').send(seed[0])

			expect(res.statusCode).toBe(201)
			expect(res.body.bookId).toBe(4)
		})
	})

	describe('PATCH /example/books/:bookId', () => {
		it('shoud update a book', async () => {
			await request(app).post('/example/books').send(seed[0])

			const res = await request(app).patch('/example/books/4').send({
				price: 465,
			})

			expect(res.statusCode).toBe(200)
			expect(res.body.price).toBe(465)
		})
	})

	describe('DELETE /example/books/:bookId', () => {
		it('should delete a book', async () => {
			await request(app).post('/example/books').send(seed[0])

			const res = await request(app).delete('/example/books/4')

			expect(res.statusCode).toBe(200)
		})
	})
})
