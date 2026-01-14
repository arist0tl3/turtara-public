import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ITeam {
  _id: string;
  createdAt: Date;
  createdById: string;
  deleted?: boolean;
  deletedAt?: Date;
  deletedById?: string;

  name: string;
  profileImageSrc?: string;
}

const teamSchema = new Schema<ITeam>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  createdById: { type: String, required: true },
  deleted: { type: Boolean },
  deletedAt: { type: Date },
  deletedById: { type: String },

  name: { type: String, required: true },
  profileImageSrc: { type: String },
});

const Team = model<ITeam>('Team', teamSchema);

export default Team;
