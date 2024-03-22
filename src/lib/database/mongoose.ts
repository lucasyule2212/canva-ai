import { env } from '@/env'
import mongoose, { Mongoose } from 'mongoose'
const MONGODB_URL = env.MONGODB_URI

interface MongooseConnection {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

// Below its a cache of mongodb connection to avoid multiple connections

let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn
  if (!MONGODB_URL) throw new Error('MONGODB_URL is not defined')

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'imaginify',
      bufferCommands: false,
    })

  cached.conn = await cached.promise
}
