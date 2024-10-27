import mongoose from 'mongoose'
import debug from './debugFunction.js'
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
