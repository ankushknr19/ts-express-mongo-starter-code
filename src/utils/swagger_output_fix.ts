import fs from 'fs'
import path from 'path'

const swagger_output_in_src = path.join(
	__dirname,
	'..',
	'..',
	'src',
	'swagger_output.json'
)
const swagger_output_in_dist = path.join(__dirname, '..', 'swagger_output.json')

// Load any one of the JSON files
const data = JSON.parse(fs.readFileSync(swagger_output_in_src, 'utf-8'))

// Update the swagger 2.0 value to openapi 3.0.0
if (data.swagger === '2.0') {
	data.openapi = '3.0.0'
	delete data.swagger
	delete data.host
}
// Save the updated JSON to the output files
fs.writeFileSync(swagger_output_in_src, JSON.stringify(data, null, 2))
fs.writeFileSync(swagger_output_in_dist, JSON.stringify(data, null, 2))
