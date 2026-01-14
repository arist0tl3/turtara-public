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

import { useDeletePersonMutation, usePeopleByCurrentUserQuery } from '../../../generated';

function AllPeople(): ReactElement {
  const { data, error, loading } = usePeopleByCurrentUserQuery({
    fetchPolicy: 'network-only',
  });

  const [deletePerson] = useDeletePersonMutation({
    refetchQueries: ['PeopleByCurrentUser'],
  });

  if (error) return <div>{`Error: ${error}`}</div>;
  if (loading) return <div>{'Loading...'}</div>;

  const people = data?.peopleByCurrentUser || [];

  const handleDeleteClick = (personId: string): void => {
    deletePerson({
      variables: {
        input: {
          personId,
        },
      },
    });
  };

  return (
    <div>
      <Header>
        <Typography level={'h2'}>{'People'}</Typography>
        <Link to={'/people/new'}>
          <Button>{'Add a person'}</Button>
        </Link>
      </Header>
      {!!people.length && (
        <StyledSheet>
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}></th>
                <th>{'First Name'}</th>
                <th>{'Last Name'}</th>
                <th style={{ width: '48px' }}></th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person._id}>
                  <td>
                    <Link to={`/people/${person._id}`}>{'View'}</Link>
                  </td>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>
                    <UnstyledButton onClick={() => handleDeleteClick(person._id)}>
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

export default AllPeople;
