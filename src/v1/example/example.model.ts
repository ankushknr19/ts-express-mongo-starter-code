import mongoose from 'mongoose'

export interface BookDocument {
	bookId: string
	title: string
	price: number
}

const BoookSchema = new mongoose.Schema<BookDocument>(
	{
		bookId: { type: String, required: true, unique: true },
		title: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
)

export const BookModel = mongoose.model<BookDocument>('Book', BoookSchema)
