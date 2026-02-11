import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Grid, Typography } from '@mui/joy';
import styled from 'styled-components';

import { useTeamQuery } from '../../../generated';
import Avatar from '../../Avatar';
import { background, primary, onPrimary } from '../../../theme/colors';
import EditTeam from '../EditTeam';
import formatName from '../../../utils/formatName';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${primary};
`;

const NewHeader = styled.div`
  width: 100%;
  padding: 0px 24px 0px 24px;
  z-index: 1;
  transform: translateY(16px);
  min-height: 128px;
`;

const Content = styled.div`
  width: 100%;
  background: ${background};
  height: calc(100% - 128px);
  padding: 16px 24px 24px;
  overflow: auto;
`;

function TeamComponent(): ReactElement {
  const { teamId = '' } = useParams();

  const { data, error, loading } = useTeamQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        teamId,
      },
    },
  });

  if (loading) return <div></div>;

  const team = data?.team;
  if (error || !team) return <div>{`Error: ${error}`}</div>;

  const teamMembers = team.people || [];

  return (
    <Container>
      <NewHeader>
        <HeaderWrapper>
          <Avatar size={128} src={team.profileImageSrc} />
          <DetailsWrapper>
            <Typography style={{ transform: 'translateX(-2px)' }} textColor={onPrimary} level={'h2'}>
              {team.name}
            </Typography>
          </DetailsWrapper>
        </HeaderWrapper>
      </NewHeader>

      <Content>
        <Grid container spacing={2}>
          <Grid xs={12} md={5}>
            <Card variant="plain">
              <CardContent>
                <Typography level="h4" sx={{ mb: 1 }}>
                  Team Members
                </Typography>
                {teamMembers.length === 0 && <Typography level="body-sm">No team members yet.</Typography>}
                {teamMembers.map((person) => (
                  <Box key={person._id} sx={{ py: 0.75 }}>
                    <Typography>{formatName(person)}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={7}>
            <EditTeam />
          </Grid>
        </Grid>
      </Content>
    </Container>
  );
}

export default TeamComponent;
