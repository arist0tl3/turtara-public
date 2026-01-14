import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IPersonGoal {
  _id: string;
  createdAt: Date;
  createdById: string;
  deleted?: boolean;
  deletedAt?: Date;
  deletedById?: string;

  content: string;
  personId: string;
  targetDate: Date;
}

const personGoalSchema = new Schema<IPersonGoal>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  createdById: { type: String, required: true },
  deleted: { type: Boolean },
  deletedAt: { type: Date },
  deletedById: { type: String },

  content: { type: String, required: true },
  personId: { type: String, required: true },
  targetDate: { type: Date, required: true },
});

const PersonGoal = model<IPersonGoal>('PersonGoal', personGoalSchema);

export default PersonGoal;
