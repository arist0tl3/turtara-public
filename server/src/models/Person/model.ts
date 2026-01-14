import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IPRScore {
  id: string;
  score: number;
  role: 'author' | 'reviewer';
}

export interface IGithubScore {
  _id: string;
  createdAt: Date;
  total: number;
  author: number;
  reviewer: number;
  prCount: number;
  authorCount: number;
  reviewerCount: number;
  meaningfulReviewRatio: number;
  balanceMultiplier: number;
  prScores: IPRScore[];
}

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
  githubHandle?: string;
  roleId?: string;

  reportsToMe: boolean;
  githubScore: IGithubScore;
  githubScores: IGithubScore[];
}

const prScoreSchema = new Schema<IPRScore>({
  id: { type: String, required: true },
  score: { type: Number, required: true },
  role: { type: String, required: true },
});

const githubScoreSchema = new Schema<IGithubScore>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  total: { type: Number, required: true },
  author: { type: Number, required: true },
  reviewer: { type: Number, required: true },
  prCount: { type: Number, required: true },
  authorCount: { type: Number, required: true },
  reviewerCount: { type: Number, required: true },
  meaningfulReviewRatio: { type: Number, required: true },
  balanceMultiplier: { type: Number, required: true },
  prScores: { type: [prScoreSchema], required: true },
});

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
  githubHandle: { type: String },
  roleId: { type: String },

  reportsToMe: { type: Boolean, default: false },
  githubScore: { type: githubScoreSchema, default: null },
  githubScores: { type: [githubScoreSchema], default: [] },
});

const Person = model<IPerson>('Person', personSchema);

export default Person;
