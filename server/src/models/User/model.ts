import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import argon2 from 'argon2';

export interface IJiraColumnGroup {
  _id: string;
  name: string;
}

export interface IJiraColumn {
  _id: string;
  name: string;
  jiraColumnGroupId: string;
  first: boolean;
  last: boolean;
}

export interface IUser {
  _id: string;
  createdAt: Date;
  email: string;
  password: string;
  phoneNumber?: string;

  jiraHost?: string;
  jiraEmail?: string;
  jiraToken?: string;

  githubToken?: string;
  githubOrganization?: string;

  jiraColumnGroups?: IJiraColumnGroup[];
  jiraColumns?: IJiraColumn[];

  hasJiraToken?: boolean;
  hasGithubToken?: boolean;
  
  // New fields for account security
  failedLoginAttempts: number;
  lockedUntil?: Date;
}

const jiraColumnGroupSchema = new Schema<IJiraColumnGroup>({
  _id: { type: String, required: true, default: uuidv4 },
  name: { type: String },
});

const jiraColumnSchema = new Schema<IJiraColumn>({
  _id: { type: String, required: true, default: uuidv4 },
  name: { type: String },
  jiraColumnGroupId: { type: String },
  first: { type: Boolean },
  last: { type: Boolean },
});

const userSchema = new Schema<IUser>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },

  jiraHost: { type: String },
  jiraEmail: { type: String },
  jiraToken: { type: String },
  githubToken: { type: String },
  githubOrganization: { type: String },

  jiraColumnGroups: { type: [jiraColumnGroupSchema], default: [] },
  jiraColumns: { type: [jiraColumnSchema], default: [] },

  hasJiraToken: { type: Boolean },
  hasGithubToken: { type: Boolean },
  
  failedLoginAttempts: { type: Number, default: 0 },
  lockedUntil: { type: Date },
});

const User = model<IUser>('User', userSchema);

export default User;
