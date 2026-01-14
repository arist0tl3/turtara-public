import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IPersonNote {
  _id: string;
  createdAt: Date;
  createdById: string;
  deleted?: boolean;
  deletedAt?: Date;
  deletedById?: string;

  content: string;
  personId: string;
}

const personNoteSchema = new Schema<IPersonNote>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  createdById: { type: String, required: true },
  deleted: { type: Boolean },
  deletedAt: { type: Date },
  deletedById: { type: String },

  content: { type: String, required: true },
  personId: { type: String, required: true },
});

const PersonNote = model<IPersonNote>('PersonNote', personNoteSchema);

export default PersonNote;
