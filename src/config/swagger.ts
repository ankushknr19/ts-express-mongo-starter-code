import swaggerAutogen from 'swagger-autogen'
import { exampleComponents } from '../v1/example/example.zod.openapi'

const outputFile = 'src/swagger_output.json'
const endpointsFiles = ['src/v1/routes.ts']

const doc = {
	info: {
		version: '1.0.0',
		title: 'TS-Express-Mongo Starter Code',
		description:
			'NodeJS/Express starter code with - TypeScript, MongoDB setup, Error/Exception Handler, Logger, API testing example, Swagger Docs example, Mongoose model example, ZOD validation example, CRUD operations example',
		contact: {
			author: 'Ankush Kunwar',
			email: 'ank.knr@gmail.com',
		},
	},
	servers: [
		{
			url: '/api/v1',
		},
	],
	...exampleComponents,
}

swaggerAutogen()(outputFile, endpointsFiles, doc)
