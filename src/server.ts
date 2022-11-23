import app from './app'
import { PORT } from './config/env'
import logger from './middlewares/winstonLogger'
import { connectDB, disconnectDB } from './config/db.connect'

const server = app.listen(PORT, async () => {
	logger.info(`server running at http://localhost:${PORT}`)

	await connectDB()
})

async function gracefullShutdown() {
	await disconnectDB()
	logger.warn('shutting down server...')
	server.close()
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

export default server
