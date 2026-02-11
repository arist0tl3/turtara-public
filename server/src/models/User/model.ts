import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import argon2 from 'argon2';

export interface IUser {
  _id: string;
  createdAt: Date;
  email: string;
  password: string;
  phoneNumber?: string;
  
  // New fields for account security
  failedLoginAttempts: number;
  lockedUntil?: Date;
}

const userSchema = new Schema<IUser>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  
  failedLoginAttempts: { type: Number, default: 0 },
  lockedUntil: { type: Date },
});

const User = model<IUser>('User', userSchema);

export default User;
