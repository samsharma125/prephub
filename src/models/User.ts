import { Schema, model, models } from 'mongoose'

export type UserRole = 'student' | 'admin'
export interface IUser { email: string; name: string; password: string; role: UserRole }

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true, index: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student' }
  },
  { timestamps: true }
)

export const User = models.User || model<IUser>('User', UserSchema)
