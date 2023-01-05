import swaggerAutogen from 'swagger-autogen'
import { exampleComponents } from '../v1/example/example.schema.openapi'

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
			url: 'http://localhost:{port}/api/v1',
			description: 'Development Server',
			variables: {
				port: {
					default: 5800,
				},
			},
		},
	],
	...exampleComponents,
}

swaggerAutogen()(outputFile, endpointsFiles, doc)
