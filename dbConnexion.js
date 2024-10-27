import mongoose from 'mongoose'
import debugLib from 'debug'

const debug = debugLib('npx-express-generator-ejs:server')
const DATABASE_NAME = 'CRUD_API'

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost/${DATABASE_NAME}`)
    console.log(`CONNECTED TO MONGODB: ${DATABASE_NAME}`)
  } catch (error) {
    debug(error)
  }
}
export default connectDB
