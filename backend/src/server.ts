import { PORT } from './config/env'
import { connectDB } from './config/db.connect'
import logger from './middlewares/winstonLogger'
import app from './app'

const server = app.listen(PORT, async () => {
	logger.info(`server running at http://localhost:${PORT}`)

	await connectDB()
})

process.on('unhandledRejection', (reason: Error) => {
	logger.error(reason.message)
	logger.warn('unhandled rejection!')
	throw reason
})

process.on('uncaughtException', (error: Error) => {
	logger.error(error.message)
	logger.warn('uncaught exception! shutting down server...')
	server.close()
})

process.on('SIGTERM', () => {
	logger.warn('process terminated')
	server.close()
})

export default server
