import app from './app'
import { PORT } from './config/env'
import logger from './utils/winstonLogger'
import { connectDB, disconnectDB } from './config/database'

app.listen(PORT, async () => {
	logger.info(`server running at http://localhost:${PORT}`)
	await connectDB()
})

//excention handling and gracefull shutdown of the server
async function gracefullShutdown() {
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
	gracefullShutdown
})

process.on('SIGINT', gracefullShutdown)
process.on('SIGTERM', gracefullShutdown)
