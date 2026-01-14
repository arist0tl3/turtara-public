import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/joy/Box';

import { useCurrentUserQuery, CurrentUser } from './generated';

import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AllPeople from './components/pages/AllPeople';
import NewPerson from './components/pages/NewPerson';
import Person from './components/pages/Person';
import NewPersonNote from './components/pages/NewPersonNote';
import EditPersonNote from './components/pages/EditPersonNote';
import EditPerson from './components/pages/EditPerson';
import NewTeam from './components/pages/NewTeam';
import NewPersonGoal from './components/pages/NewPersonGoal';
import EditPersonGoal from './components/pages/EditPersonGoal';
import Settings from './components/pages/Settings';
import NewRole from './components/pages/NewRole';
import NewFeedback from './components/pages/NewFeedback';
import Team from './components/pages/Team';
import Layout from './components/Layout/Layout';
import Config from './components/pages/Config/Config';

export const CurrentUserContext = createContext<CurrentUser | null>(null);

function App() {
  const { data, error, loading } = useCurrentUserQuery();

  if (loading) return <div>{''}</div>;
  if (error) return <div>{`Error: ${error}`}</div>;

  const currentUser = data?.currentUser ?? null;

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <BrowserRouter>
        {!currentUser && (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}

        {currentUser && (
          <CurrentUserContext.Provider value={currentUser}>
            <Routes>
              <Route element={<Layout />}>
                <Route path={'/'} element={<Dashboard />} />

                <Route path={'/people'} element={<AllPeople />} />
                <Route path={'/people/new'} element={<NewPerson />} />

                <Route path={'/people/:personId'} element={<Person />} />
                <Route path={'/people/:personId/edit'} element={<EditPerson />} />

                <Route path={'/people/:personId/notes/new'} element={<NewPersonNote />} />
                <Route path={'/people/:personId/notes/:personNoteId'} element={<EditPersonNote />} />

                <Route path={'/people/:personId/goals/new'} element={<NewPersonGoal />} />
                <Route path={'/people/:personId/goals/:personGoalId'} element={<EditPersonGoal />} />

                <Route path={'/people/:personId/feedback/new'} element={<NewFeedback />} />

                <Route path={'/roles/new'} element={<NewRole />} />

                <Route path={'/settings'} element={<Settings />} />

                <Route path={'/teams/new'} element={<NewTeam />} />
                <Route path={'/teams/:teamId'} element={<Team />} />

                <Route path={'/config'} element={<Config />} />

                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/register" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </CurrentUserContext.Provider>
        )}
      </BrowserRouter>
    </Box>
  );
}

export default App;
