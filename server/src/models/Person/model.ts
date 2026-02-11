import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IPerson {
  _id: string;
  createdAt: Date;
  createdById: string;
  deleted?: boolean;
  deletedAt?: Date;
  deletedById?: string;

  firstName: string;
  lastName: string;
  partners?: string;
  pets?: string;
  kids?: string;
  profileImageSrc?: string;

  teamId?: string;
  roleId?: string;

  reportsToMe: boolean;
}

const personSchema = new Schema<IPerson>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  createdById: { type: String, required: true },
  deleted: { type: Boolean },
  deletedAt: { type: Date },
  deletedById: { type: String },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  partners: { type: String },
  pets: { type: String },
  kids: { type: String },
  profileImageSrc: { type: String },

  teamId: { type: String },
  roleId: { type: String },

  reportsToMe: { type: Boolean, default: false },
});

const Person = model<IPerson>('Person', personSchema);

export default Person;
