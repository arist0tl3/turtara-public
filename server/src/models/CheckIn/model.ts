import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ICheckIn {
  _id: string;
  createdAt: Date;
  createdById: string;
  deleted?: boolean;
  deletedAt?: Date;
  deletedById?: string;

  personId: string;
  weeklyGoal: string;
  meetingRequested: boolean;
  meetingRequestedReasons: string[];
  weeklyConfidence: number;
  weeklyConfidenceReason: string;
}

const checkInSchema = new Schema<ICheckIn>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  createdById: { type: String, required: true },
  deleted: { type: Boolean },
  deletedAt: { type: Date },
  deletedById: { type: String },

  personId: { type: String, required: true },
  weeklyGoal: { type: String, required: true, default: '' },
  meetingRequested: { type: Boolean, required: true, default: false },
  meetingRequestedReasons: { type: [String], required: true, default: [] },
  weeklyConfidence: { type: Number, required: true, default: 3 },
  weeklyConfidenceReason: { type: String },
});

const CheckIn = model<ICheckIn>('CheckIn', checkInSchema);

export default CheckIn;
