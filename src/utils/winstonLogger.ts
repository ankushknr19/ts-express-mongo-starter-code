import winston from 'winston'
import { NODE_ENV } from '../config/env'

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
}

//log only at this level or higher
const level = () => {
	const env = NODE_ENV || 'development'
	const isDevelopment = env === 'development'
	return isDevelopment ? 'debug' : 'warn'
}

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.colorize({ all: true }),
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`
	)
)

const transports = [new winston.transports.Console()]

const logger = winston.createLogger({
	level: level(),
	levels,
	format,
	transports,
	silent: NODE_ENV === 'production',
})

export default logger
