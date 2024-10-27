import mongoose from 'mongoose'
import debugLib from 'debug'

const debug = debugLib('npx-express-generator-ejs:server')
const DATABASE_NAME = 'CRUD_API'

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost/${DATABASE_NAME}`)
    console.log(`\nCONNECTED TO MONGODB: ${DATABASE_NAME}\n`)
  } catch (error) {
    debug('ERROR CONNECTING DATABASE', error)
  }
}
export default connectDB
