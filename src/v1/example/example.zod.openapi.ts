import { z } from 'zod'
import {
	OpenAPIGenerator,
	OpenAPIRegistry,
	extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi'
import { createBookSchema, updateBookSchema } from './example.validation.schema'

extendZodWithOpenApi(z)
const registry = new OpenAPIRegistry()

//make openapi component schemas from zod schemas
registry.register('createBook', createBookSchema)
registry.register('updateBook', updateBookSchema)

const generator = new OpenAPIGenerator(registry.definitions, '3.0.0')
export const exampleComponents = generator.generateComponents()
