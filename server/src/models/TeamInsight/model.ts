import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ITeamInsight {
  _id: string;
  createdAt: Date;
  createdById: string;

  teamLevelReport: ITeamLevelReport[];
  individualLevelReport: IIndividualLevelReport[];
  issueAnomaliesReport: IIssueAnomalyReport[];
  observationsReport: string[];

  teamId: string;
}

export interface ITeamInsightAnomaly {
  type: string;
  teamId: string;
  personId: string;
  content: string;
}

export interface ITeamLevelReport {
  sprintId: number;
  score: number;
  summary: string;
}

export interface IIndividualLevelReport {
  personId: string;
  score: number;
  summary: string;
}

export interface IIssueAnomalyReport {
  issueId: string;
  severity: number;
  summary: string;
}

const teamLevelReportSchema = new Schema<ITeamLevelReport>({
  sprintId: { type: Number },
  score: { type: Number },
  summary: { type: String },
});

const individualLevelReportSchema = new Schema<IIndividualLevelReport>({
  personId: { type: String },
  score: { type: Number },
  summary: { type: String },
});

const issueAnomalyReportSchema = new Schema<IIssueAnomalyReport>({
  issueId: { type: String },
  severity: { type: Number },
  summary: { type: String },
});

const teamInsightSchema = new Schema<ITeamInsight>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  createdById: { type: String, required: true },

  teamLevelReport: { type: [teamLevelReportSchema], required: true, default: [] },
  individualLevelReport: { type: [individualLevelReportSchema], required: true, default: [] },
  issueAnomaliesReport: { type: [issueAnomalyReportSchema], required: true, default: [] },
  observationsReport: { type: [String], required: true, default: [] },

  teamId: { type: String, required: true },
});

const TeamInsight = model<ITeamInsight>('TeamInsight', teamInsightSchema);

export default TeamInsight;
