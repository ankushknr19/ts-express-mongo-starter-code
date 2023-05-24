import app from './app'
import { PORT } from './config/env'
import logger from './utils/winstonLogger'
import { connectDB, disconnectDB } from './config/database'

connectDB().then(() => {
	app.listen(PORT, async () => {
		logger.info(`server running at http://localhost:${PORT}`)
	})
})

//excention handling and graceful shutdown of the server
async function gracefulShutdown() {
	await disconnectDB()
	logger.warn('shutting down server...')
	process.exit(1)
}

process.on('unhandledRejection', (reason: Error) => {
	logger.error(reason.message)
	logger.warn('unhandled rejection!')
	throw reason
})

process.on('uncaughtException', (error: Error) => {
	logger.error(error.message)
	gracefulShutdown()
})

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
