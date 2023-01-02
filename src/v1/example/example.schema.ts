import { z } from 'zod'

//schemas for validating incoming data

export const createBookSchema = z.object({
	body: z.object({
		bookId: z.number(),
		title: z.string().trim(),
		price: z.number().max(10000),
	}),
})

export const updateBookSchema = z.object({
	body: z.object({
		title: z.string().trim().optional(),
		price: z.number().max(10000).optional(),
	}),
})
