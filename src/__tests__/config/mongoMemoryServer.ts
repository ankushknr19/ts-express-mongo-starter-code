import mongoose from 'mongoose'
import logger from '../../utils/winstonLogger'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoMemoryServer: MongoMemoryServer

export async function connectMonogoMemoryServer() {
	try {
		mongoMemoryServer = await MongoMemoryServer.create()

		await mongoose.connect(mongoMemoryServer.getUri())
	} catch (error) {
		logger.error(
			'error during inital connection to mongo memory server: ',
			error
		)
		process.exit(1)
	}
}

export async function disconnectMonogoMemoryServer() {
	try {
		await mongoose.connection.close()
		mongoMemoryServer.stop()
	} catch (error) {
		logger.warn('Error during disconnecting mongodb memory server')
	}
}
