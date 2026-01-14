import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IFeedback {
  _id: string;
  createdAt: Date;
  createdById: string;

  personId: string;
  type: string;

  content: string;
}

const feedbackSchema = new Schema<IFeedback>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  createdById: { type: String, required: true },

  personId: { type: String, required: true },
  type: { type: String, required: true },

  content: { type: String, required: true },
});

const Feedback = model<IFeedback>('Feedback', feedbackSchema);

export default Feedback;
