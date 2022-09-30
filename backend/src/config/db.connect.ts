import mongoose from 'mongoose'
import { MONGO_URI } from '../config/env'
import logger from '../middlewares/winstonLogger'

export async function connectDB() {
	try {
		const mongoURI: string = MONGO_URI || ''

		await mongoose.connect(mongoURI)
	} catch (error) {
		logger.error('error during inital connection to mongodb database')
		process.exit()
	}
}

mongoose.connection.on('connected', () => logger.info('Mongoose connected...'))

mongoose.connection.on('error', (err) => logger.error(err.message))

mongoose.connection.on('disconnected', () =>
	logger.warn('Mongoose disconnected.')
)

process.on('SIGINT', async () => {
	await mongoose.connection.close()
})
