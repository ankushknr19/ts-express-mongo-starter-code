import mongoose from 'mongoose'
import { MONGO_URI } from './env'
import logger from '../middlewares/winstonLogger'

export async function connectDB() {
	try {
		await mongoose.connect(MONGO_URI)
	} catch (error) {
		logger.error(
			'error during inital connection to mongodb database: ',
			error
		)
		process.exit(1)
	}
}

mongoose.connection.on('connected', () =>
	logger.info('Mongodb database connected...')
)

mongoose.connection.on('error', (err) => logger.error(err.message))

mongoose.connection.on('disconnected', () =>
	logger.warn('Mongodb database disconnected...')
)

export async function disconnectDB() {
	try {
		logger.warn('Mongodb database disconnected...')
		await mongoose.connection.close()
	} catch (error) {
		logger.warn('Error during disconnecting mongodb database')
	}
}
