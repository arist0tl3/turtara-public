import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUserTodo {
  _id: string;
  createdAt: Date;
  createdById: string;
  content: string;
  completedAt?: Date;
}

const userTodoSchema = new Schema<IUserTodo>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  createdById: { type: String, required: true },
  content: { type: String, required: true },
  completedAt: { type: Date },
});

const UserTodo = model<IUserTodo>('UserTodo', userTodoSchema);

export default UserTodo;
