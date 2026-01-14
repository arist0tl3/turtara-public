import React from 'react';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { Person, Sprint } from '../../../generated';
import styled from 'styled-components';
import { onSurface } from '../../../theme/colors';

const StyledTable = styled(Table)`
  * {
    color: ${onSurface};
    border-color: ${onSurface} !important;
  }
`;

const ChartContainer = styled.div`
  margin-bottom: 24px;
`;

interface Props {
  recentIssuesBySprint: Sprint[];
  teamMembers: Person[];
}

const TeamSprintTable: React.FC<Props> = ({ recentIssuesBySprint, teamMembers }) => {
  const sprints = recentIssuesBySprint;

  // Prepare a map of sprint data for easy access
  const sprintColumns = sprints.map((sprint) => sprint.name);

  // Transform the data into a structure usable by the table
  const rows = teamMembers
    .map((member) => {
      let totalPoints = 0;
      let totalIssueCount = 0;

      const data = sprintColumns.map((sprintName) => {
        const sprint = sprints.find((s) => s.name === sprintName);
        const contribution = sprint?.contributions.find((c) => c.personId === member._id);

        if (contribution?.storyPoints) totalPoints += contribution.storyPoints;
        if (contribution?.issueCount) totalIssueCount += contribution.issueCount;

        return contribution
          ? {
              storyPoints: contribution.storyPoints,
              averageCycleTime: contribution.averageCycleTime,
              issueCount: contribution.issueCount,
            }
          : { storyPoints: '-', averageCycleTime: '-', issueCount: '-' };
      });

      return { member, data, totalPoints, totalIssueCount };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <Box>
      <ChartContainer>
        <Typography textColor={onSurface} level="h4" sx={{ mb: 2 }}>
          {'Points completed per sprint'}
        </Typography>
        <StyledTable borderAxis={'both'} sx={{ borderCollapse: 'collapse', width: '100%' }} size={'md'}>
          <thead>
            <tr>
              <th>{'Team Member'}</th>
              {sprintColumns.map((sprint) => (
                <th key={sprint}>{sprint}</th>
              ))}
              <th>{'Total'}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ member, data, totalPoints }) => (
              <>
                <tr key={member._id}>
                  <td>
                    {member.firstName} {member.lastName}
                  </td>
                  {data.map((item, index) => (
                    <td key={`${member._id}-story-${index}`}>{item.storyPoints}</td>
                  ))}
                  <td>{totalPoints}</td>
                </tr>
              </>
            ))}
          </tbody>
        </StyledTable>
      </ChartContainer>

      <ChartContainer>
        <Typography textColor={onSurface} level="h4" sx={{ mb: 2 }}>
          {'Issues completed per sprint'}
        </Typography>
        <StyledTable borderAxis={'both'} sx={{ borderCollapse: 'collapse', width: '100%' }} size={'md'}>
          <thead>
            <tr>
              <th>{'Team Member'}</th>
              {sprintColumns.map((sprint) => (
                <th key={sprint}>{sprint}</th>
              ))}
              <th>{'Total'}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ member, data, totalIssueCount }) => (
              <>
                <tr key={member._id}>
                  <td>
                    {member.firstName} {member.lastName}
                  </td>
                  {data.map((item, index) => (
                    <td key={`${member._id}-issue-${index}`}>{item.issueCount}</td>
                  ))}
                  <td>{totalIssueCount}</td>
                </tr>
              </>
            ))}
          </tbody>
        </StyledTable>
      </ChartContainer>
    </Box>
  );
};

export default TeamSprintTable;
