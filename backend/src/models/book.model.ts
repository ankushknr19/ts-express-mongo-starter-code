import mongoose from 'mongoose'

interface BookDocument {
	bookId: number
	title: string
	price: number
}

const BoookSchema = new mongoose.Schema<BookDocument>(
	{
		bookId: { type: Number, required: true, unique: true },
		title: { type: String, lowercase: true, trim: true, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
)

export const BookModel = mongoose.model<BookDocument>('Book', BoookSchema)
