import { Button, Sheet, Typography, Table } from '@mui/joy';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Delete } from '@mui/icons-material';

import Header from '../../../styled-components/Header';

const StyledSheet = styled(Sheet)`
  border: 1px solid gray;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
  background: white;
  margin-top: 16px;
`;

const UnstyledButton = styled.button`
  border: 0;
  margin: 0;
  background: 0;
  cursor: pointer;
`;

import { useDeleteTeamMutation, useTeamsByCurrentUserQuery } from '../../../generated';

function AllTeams(): ReactElement {
  const { data, error, loading } = useTeamsByCurrentUserQuery({
    fetchPolicy: 'network-only',
  });

  const [deleteTeam] = useDeleteTeamMutation({
    refetchQueries: ['TeamsByCurrentUser'],
  });

  if (error) return <div>{`Error: ${error}`}</div>;
  if (loading) return <div>{'Loading...'}</div>;

  const teams = data?.teamsByCurrentUser || [];

  const handleDeleteClick = (teamId: string): void => {
    deleteTeam({
      variables: {
        input: {
          teamId,
        },
      },
    });
  };

  return (
    <div>
      <Header>
        <Typography level={'h2'}>{'Teams'}</Typography>
        <Link to={'/teams/new'}>
          <Button>{'Add a team'}</Button>
        </Link>
      </Header>
      {!!teams.length && (
        <StyledSheet>
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}></th>
                <th>{'Name'}</th>
                <th style={{ width: '48px' }}></th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td>
                    <Link to={`/teams/${team._id}`}>{'View'}</Link>
                  </td>
                  <td>{team.name}</td>
                  <td>
                    <UnstyledButton onClick={() => handleDeleteClick(team._id)}>
                      <Delete />
                    </UnstyledButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </StyledSheet>
      )}
    </div>
  );
}

export default AllTeams;
