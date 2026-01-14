import moment from 'moment';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { BarChart, Bar, LineChart, Line } from 'recharts';
import { Sprint } from '../../../generated';
import { onBackground, onSurface, primary, primaryVariant } from '../../../theme/colors';
import styled from 'styled-components';
import { Typography } from '@mui/joy';

interface CycleData {
  x: Date;
  y: number | undefined | null;
  ticket: string | undefined | null;
  assignee?: string;
}

interface SprintStat {
  name: string | undefined | null;
  avgCycleTime: string;
  sprintVelocity: number | undefined;
}

interface SprintCycleTimeStat {
  name: string | undefined | null;
  devCycleTime: number | undefined;
  qaCycleTime: number | undefined;
  codeReviewCycleTime: number | undefined;
  readyForQACycleTime: number | undefined;
}

const TooltipContent = styled.div`
  *,
  p {
    color: ${onBackground};
  }
`;

const getCycleTimeData = (sprints: Sprint[]) => {
  // Process your dataset to prepare scatter plot data for total time in statuses
  const cycleData: CycleData[] = [];

  sprints.forEach((sprint) => {
    sprint.issues.forEach((issue) => {
      cycleData.push({
        x: new Date(issue.resolvedAt),
        y: issue.cycleTime,
        ticket: issue.key,
        assignee: issue?.person?.firstName,
      });
    });
  });

  return cycleData;
};

const getSprintStats = (sprints: Sprint[]) => {
  // Prepare data for average cycle time and velocity per sprint
  const sprintStats: SprintStat[] = [];
  sprints.forEach((sprint) => {
    const totalCycleTime = sprint.issues.reduce((total, issue) => {
      return total + (issue?.cycleTime || 0);
    }, 0);
    const avgCycleTime = (totalCycleTime / sprint.issues.length || 0).toFixed(2); // average cycle time
    sprintStats.push({
      name: sprint.name,
      avgCycleTime,
      sprintVelocity: sprint.issues.reduce((total, issue) => total + (issue.storyPoints || 0), 0), // velocity
    });
  });
  return sprintStats;
};

const getAggregateStatusData = (sprints: Sprint[]) => {
  // Prepare data for aggregate time spent per sprint per status
  const statusData = {};

  sprints.forEach((sprint) => {
    sprint.issues.forEach((issue) => {
      Object.entries(issue.timeInStatuses).forEach(([status, time]) => {
        if (!statusData[sprint.name]) {
          statusData[sprint.name] = {};
        }
        if (!statusData[sprint.name][status]) {
          statusData[sprint.name][status] = 0;
        }
        statusData[sprint.name][status] += time;
      });
    });
  });

  return Object.entries(statusData).map(([sprintName, statuses]) => ({
    sprintName,
    ...statuses,
  }));
};

const getSprintCyleTimeBreakoutStats = (sprints: Sprint[]) => {
  // Prepare data for average cycle time and velocity per sprint
  const sprintStats: SprintCycleTimeStat[] = [];
  sprints.forEach((sprint) => {
    sprintStats.push({
      name: sprint.name,
      devCycleTime: sprint.devCycleTime,
      qaCycleTime: sprint.qaCycleTime,
      codeReviewCycleTime: sprint.codeReviewCycleTime,
      readyForQACycleTime: sprint.readyForQACycleTime,
    });
  });
  return sprintStats;
};

const InteractiveCharts = ({ data }: { data: Sprint[] }) => {
  const cycleTimeData = getCycleTimeData(data);
  const sprintStats = getSprintStats(data);
  const aggregateStatusData = getAggregateStatusData(data);
  const sprintCycleTimeBreakout = getSprintCyleTimeBreakoutStats(data);

  return (
    <>
      <Typography color={onSurface} level={'h2'}>
        {'Cycle Time Per Ticket'}
      </Typography>
      <ResponsiveContainer width="100%" height={'95%'}>
        <ScatterChart>
          <CartesianGrid color={primaryVariant} />
          <XAxis
            type="number"
            dataKey="x"
            name="Date"
            domain={['auto', 'auto']}
            ticks={cycleTimeData.map((point) => new Date(point.x).getTime())} // adding custom ticks
            tickFormatter={(value) => moment(value).format('MMM D, YYYY HH:mm')} // formatting date with moment.js
          />
          <YAxis type="number" dataKey="y" name="Cycle Time (s)" domain={['auto', 'auto']} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <TooltipContent>
                    <p>{`Ticket: ${payload[0].payload.ticket}`}</p>
                    <p>{`Assignee: ${payload[0].payload.assignee}`}</p>
                    <p>{`Cycle Time: ${payload[1].value.toFixed(2)} days`}</p>
                  </TooltipContent>
                );
              }
              return null;
            }}
          />
          <Scatter name="Tickets" data={cycleTimeData} fill={primary} />
          <ReferenceLine x={new Date().getTime()} stroke="red" strokeDasharray="3 3" />
        </ScatterChart>
      </ResponsiveContainer>

      <h2>Last 6 Sprints - Average Cycle Time & Velocity</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sprintStats}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name={'Average Cycle Time'} type="monotone" dataKey="avgCycleTime" fill="#82ca9d" />
          <Bar name={'Sprint Velocity'} type="monotone" dataKey="sprintVelocity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Last 6 Sprints - Dev & QA Cycle Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sprintCycleTimeBreakout}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name={'In Dev'} type="monotone" dataKey="devCycleTime" fill="#2d864f" />
          <Bar name={'Code Review'} type="monotone" dataKey="codeReviewCycleTime" fill="#f8e536" />
          <Bar name={'Ready for QA'} type="monotone" dataKey="readyForQACycleTime" fill="#fda532" />
          <Bar name={'In QA'} type="monotone" dataKey="qaCycleTime" fill="#4a41ee" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default InteractiveCharts;
