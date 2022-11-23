import rateLimit from 'express-rate-limit'

const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, //15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true,
	legacyHeaders: false,
})

export default rateLimiter