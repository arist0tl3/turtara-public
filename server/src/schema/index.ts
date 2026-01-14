import { gql } from 'graphql-tag';
import { GraphQLDateTime } from 'graphql-scalars';

import CheckInResolvers from '../models/CheckIn/resolvers';
import CheckInTypeDefs from '../models/CheckIn/typeDefs';

import FeedbackResolvers from '../models/Feedback/resolvers';
import FeedbackTypeDefs from '../models/Feedback/typeDefs';

import JiraIssueResolvers from '../models/JiraIssue/resolvers';
import JiraIssueTypeDefs from '../models/JiraIssue/typeDefs';

import MeetingPrepResolvers from '../models/MeetingPrep/resolvers';
import MeetingPrepTypeDefs from '../models/MeetingPrep/typeDefs';

import PersonResolvers from '../models/Person/resolvers';
import PersonTypeDefs from '../models/Person/typeDefs';

import PersonGoalResolvers from '../models/PersonGoal/resolvers';
import PersonGoalTypeDefs from '../models/PersonGoal/typeDefs';

import PersonNoteResolvers from '../models/PersonNote/resolvers';
import PersonNoteTypeDefs from '../models/PersonNote/typeDefs';

import PullRequestResolvers from '../models/PullRequest/resolvers';
import PullRequestTypeDefs from '../models/PullRequest/typeDefs';

import RoleResolvers from '../models/Role/resolvers';
import RoleTypeDefs from '../models/Role/typeDefs';

import TeamInsightResolvers from '../models/TeamInsight/resolvers';
import TeamInsightTypeDefs from '../models/TeamInsight/typeDefs';

import TeamResolvers from '../models/Team/resolvers';
import TeamTypeDefs from '../models/Team/typeDefs';

import UserResolvers from '../models/User/resolvers';
import UserTypeDefs from '../models/User/typeDefs';

import UserTodoResolvers from '../models/UserTodo/resolvers';
import UserTodoTypeDefs from '../models/UserTodo/typeDefs';

const ScalarResolvers = {
  DateTime: GraphQLDateTime,
};

const ScalarTypeDefs = gql`
  scalar DateTime
`;

const schema = [
  {
    resolvers: ScalarResolvers,
    typeDefs: ScalarTypeDefs,
  },
  {
    resolvers: CheckInResolvers,
    typeDefs: CheckInTypeDefs,
  },
  {
    resolvers: FeedbackResolvers,
    typeDefs: FeedbackTypeDefs,
  },
  {
    resolvers: MeetingPrepResolvers,
    typeDefs: MeetingPrepTypeDefs,
  },
  {
    resolvers: JiraIssueResolvers,
    typeDefs: JiraIssueTypeDefs,
  },
  {
    resolvers: PersonResolvers,
    typeDefs: PersonTypeDefs,
  },
  {
    resolvers: PersonGoalResolvers,
    typeDefs: PersonGoalTypeDefs,
  },
  {
    resolvers: PersonNoteResolvers,
    typeDefs: PersonNoteTypeDefs,
  },
  {
    resolvers: PullRequestResolvers,
    typeDefs: PullRequestTypeDefs,
  },
  {
    resolvers: RoleResolvers,
    typeDefs: RoleTypeDefs,
  },
  {
    resolvers: TeamResolvers,
    typeDefs: TeamTypeDefs,
  },
  {
    resolvers: TeamInsightResolvers,
    typeDefs: TeamInsightTypeDefs,
  },
  {
    resolvers: UserResolvers,
    typeDefs: UserTypeDefs,
  },
  {
    resolvers: UserTodoResolvers,
    typeDefs: UserTodoTypeDefs,
  },
];

export default schema;
