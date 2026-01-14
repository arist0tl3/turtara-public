import { Fragment, ReactElement, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/joy';
import { Tab, TabsList, TabPanel, Tabs } from '@mui/base';
import styled from 'styled-components';
import Charts from './Charts';

import { Issue, Team, TeamInsight, useGenerateTeamInsightMutation, useRecentTeamInsightQuery, useTeamQuery } from '../../../generated';

import Avatar from '../../Avatar';
import {
  background,
  primary,
  secondary,
  onPrimary,
  onBackground,
  onSecondary,
  onSurface,
  surface,
  primaryVariant,
} from '../../../theme/colors';
import EditTeam from '../EditTeam';
import TeamSprintTable from './TeamSprintTable';
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

  a {
    margin-left: 0px;
  }
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

const NewTabs = styled.div`
  width: 100%;
  background: ${background};
  display: flex;
  flex-direction: column;
  height: calc(100% - 128px);

  .base-Tabs-root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .base-TabsList-root {
    background: ${primary};
    padding: 0 12px 0 166px;

    > button {
      cursor: pointer;
      border: 0;
      outline: 0;
      background: ${primary};
      color: ${onPrimary};
      padding: 12px;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
    }
  }

  .base-TabPanel-root:not(.base-TabPanel-hidden) {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    min-height: calc(100vh - 168px);
  }

  button.base-Tab-root.base--selected {
    background: ${background};
    color: ${onBackground};
  }
`;

const Insights = styled.div`
  padding: 16px;

  * {
    color: ${onBackground} !important;
  }

  p {
    margin-bottom: 8px;
  }
`;

const InsightsContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const InsightsSection = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const ChartsWrapper = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  margin: 16px 32px;
  padding: 16px;
  background: ${surface};
  color: ${onSurface};
  overflow-y: auto;

  h2 {
    margin-top: 16px;
  }
`;

function TeamComponent(): ReactElement {
  const navigate = useNavigate();

  const { teamId = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [teamInsight, setTeamInsight] = useState<TeamInsight | undefined>(undefined);

  const selectedTab = searchParams.get('selectedTab') || 'cycleTime';

  const [generateTeamInsight] = useGenerateTeamInsightMutation({
    onCompleted: (data) => {
      if (!!data.generateTeamInsight.teamInsight) {
        setTeamInsight(data.generateTeamInsight.teamInsight);
      }
    },
    variables: {
      input: {
        teamId,
      },
    },
  });

  const { data, error, loading } = useTeamQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        teamId,
      },
    },
  });

  const {
    data: recentTeamInsightData,
    error: recentTeamInsightError,
    loading: recentTeamInsightLoading,
  } = useRecentTeamInsightQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.recentTeamInsight) {
        setTeamInsight(data.recentTeamInsight);
      }
    },
    variables: {
      input: {
        teamId,
      },
    },
  });

  if (loading || recentTeamInsightLoading) return <div></div>;

  const team = data?.team;
  const recentTeamInsight = recentTeamInsightData?.recentTeamInsight;

  const recentIssuesBySprint = data?.team?.performance?.recentIssuesBySprint || [];

  console.log('recentIssuesBySprint', recentIssuesBySprint);
  console.log('teamInsight', teamInsight);

  if (error || !team) return <div>{`Error: ${error}`}</div>;

  const teamMembers = team?.people || [];

  const handleGenerateInsightClick = () => {
    generateTeamInsight();
  };

  console.log('selectedTab', selectedTab);

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
      <NewTabs>
        <Tabs
          orientation={'horizontal'}
          aria-label={'Placement indicator tabs'}
          defaultValue={selectedTab}
          value={selectedTab}
          onChange={(e) => {
            const selectedTab = (e?.target as HTMLElement)?.innerText?.toLowerCase();
            if (selectedTab) {
              setSearchParams({
                selectedTab,
              });
            }
          }}
        >
          <TabsList>
            <Tab className={selectedTab === 'cycle time' ? 'active' : ''} value={'cycle time'}>
              {'Cycle Time'}
            </Tab>
            <Tab className={selectedTab === 'insight' ? 'active' : ''} value={'insight'}>
              {'Insight'}
            </Tab>
            <Tab className={selectedTab === 'contributions' ? 'active' : ''} value={'contributions'}>
              {'Contributions'}
            </Tab>
            <Tab className={selectedTab === 'delivery & impact' ? 'active' : ''} value={'delivery & impact'}>
              {'Delivery & Impact'}
            </Tab>
            <Tab className={selectedTab === 'details' ? 'active' : ''} value={'details'}>
              {'Details'}
            </Tab>
          </TabsList>

          <TabPanel value={'cycle time'}>
            <ChartsWrapper>
              <Charts data={recentIssuesBySprint} />
            </ChartsWrapper>
          </TabPanel>

          <TabPanel value={'contributions'}>
            <ChartsWrapper>
              <TeamSprintTable recentIssuesBySprint={recentIssuesBySprint} teamMembers={teamMembers} />
            </ChartsWrapper>
          </TabPanel>

          <TabPanel value={'insight'}>
            <Insights>
              <Button onClick={handleGenerateInsightClick}>{'Generate New Insight'}</Button>

              {!!teamInsight && (
                <InsightsContent>
                  <InsightsSection>
                    <Typography level={'h4'}>{'Individual Contributors'}</Typography>
                    {teamInsight.individualLevelReport.map((report) => (
                      <Fragment key={report.personId}>
                        <Typography level={'title-md'}>{formatName(report.person)}</Typography>
                        <Typography level={'body-md'}>{report.summary}</Typography>
                      </Fragment>
                    ))}
                  </InsightsSection>

                  <InsightsSection></InsightsSection>

                  <InsightsSection></InsightsSection>
                </InsightsContent>
              )}
            </Insights>
          </TabPanel>

          <TabPanel value={'details'}>
            <EditTeam />
          </TabPanel>
        </Tabs>
      </NewTabs>
    </Container>
  );
}

export default TeamComponent;
