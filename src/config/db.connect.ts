import mongoose from 'mongoose'
import logger from '../middlewares/winstonLogger'
import { MONGO_URI, NODE_ENV } from './env'
import { MongoMemoryServer } from 'mongodb-memory-server'
import server from '../server'

let mongoMemoryServer: MongoMemoryServer

export async function connectDB() {
	try {
		let mongoURI: string = MONGO_URI || ''

		if (NODE_ENV == 'test') {
			mongoMemoryServer = await MongoMemoryServer.create()
			mongoURI = mongoMemoryServer.getUri()
		}

		await mongoose.connect(mongoURI)
	} catch (error) {
		logger.error('error during inital connection to mongodb database')
		server.close(() => logger.warn('shutting down server...'))
	}
}

mongoose.connection.on('connected', () =>
	mongoMemoryServer
		? logger.info('using mongo memory server for test environment...')
		: logger.info('Mongodb database connected...')
)

mongoose.connection.on('error', (err) => logger.error(err.message))

mongoose.connection.on('disconnected', () =>
	logger.warn('Mongodb database disconnected...')
)

export async function disconnectDB() {
	try {
		await mongoose.connection.close()
		mongoMemoryServer && mongoMemoryServer.stop()
	} catch (error) {
		logger.warn('Error during disconnecting mongodb database')
	}
}

process.on('SIGINT', async () => {
	logger.warn('Mongodb database disconnected...')
	await mongoose.connection.close()
})
