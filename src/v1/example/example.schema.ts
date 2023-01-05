import { z } from 'zod'

//schemas for validating incoming data

export const createBookSchema = z.object({
	bookId: z.string(),
	title: z.string().trim(),
	price: z.number().max(10000),
})

export const updateBookSchema = z.object({
	title: z.string().trim().optional(),
	price: z.number().max(10000).optional(),
})
