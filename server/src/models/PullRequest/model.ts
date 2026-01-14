import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IRepository {
  id: string;
  name: string;
  url: string;
}

export interface IPullRequest {
  _id: string;
  pullRequestId: string;
  githubId: string;
  title: string;
  createdAt: Date;
  mergedAt?: Date;
  additions: number;
  deletions: number;
  role: 'author' | 'reviewer';
  repository: IRepository;
  personId: string;
  permalink: string;
}

const repositorySchema = new Schema<IRepository>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const pullRequestSchema = new Schema<IPullRequest>({
  _id: { type: String, required: true, default: uuidv4 },
  pullRequestId: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  mergedAt: { type: Date },
  additions: { type: Number, required: true },
  deletions: { type: Number, required: true },
  role: { type: String, enum: ['author', 'reviewer'], required: true },
  repository: { type: repositorySchema, required: true },
  personId: { type: String, required: true },
  permalink: { type: String, required: true },
  githubId: { type: String, required: true },
});

const PullRequest = model<IPullRequest>('PullRequest', pullRequestSchema);

export default PullRequest;
