import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  _id: string
  clerkId: string
  username: string
  firstName: string
  lastName: string
  photo: string
  planId: string
  creditBalance: number
  createdAt?: Date
  updatedAt?: Date
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  planId: { type: String, required: true, default: 1 },
  creditBalance: { type: Number, required: true, default: 10 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
