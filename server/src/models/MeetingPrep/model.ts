import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IMeetingPrep {
  _id: string;
  createdAt: Date;
  createdById: string;

  personId: string;

  topics: string[];
}

const meetingPrepSchema = new Schema<IMeetingPrep>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  createdById: { type: String, required: true },

  personId: { type: String, required: true },

  topics: { type: [String], required: true, default: [] },
});

const MeetingPrep = model<IMeetingPrep>('MetingPrep', meetingPrepSchema);

export default MeetingPrep;
