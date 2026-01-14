import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IRole {
  _id: string;
  createdAt: Date;
  createdById: string;
  deleted?: boolean;
  deletedAt?: Date;
  deletedById?: string;

  name: string;
}

const roleSchema = new Schema<IRole>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  createdById: { type: String, required: true },
  deleted: { type: Boolean },
  deletedAt: { type: Date },
  deletedById: { type: String },

  name: { type: String, required: true },
});

const Role = model<IRole>('Role', roleSchema);

export default Role;
