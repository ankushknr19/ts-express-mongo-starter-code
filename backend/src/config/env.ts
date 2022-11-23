import fs from 'fs'
import dotenv from 'dotenv'
import logger from '../middlewares/winstonLogger'

fs.existsSync('.env') ? dotenv.config() : logger.error('.env file not found.')

export const NODE_ENV = process.env.NODE_ENV as string
export const PORT = (process.env.PORT ?? 5800) as number

const prod: boolean = NODE_ENV === 'production'
export const MONGO_URI = prod
	? (process.env.MONGO_PROD as string)
	: (process.env.MONGO_LOCAL as string)
