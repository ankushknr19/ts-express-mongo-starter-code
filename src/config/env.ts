import dotenv from 'dotenv'

dotenv.config()

export const NODE_ENV = process.env.NODE_ENV as string
export const DEV_ENV = process.env.DEV_ENV as string
export const PORT = (process.env.PORT ?? 5800) as number

export const MONGO_URI =
	NODE_ENV === 'production'
		? (process.env.MONGO_PROD as string)
		: DEV_ENV === 'online'
		? (process.env.MONGO_DEV_ONLINE as string)
		: (process.env.MONGO_DEV_OFFLINE as string)
