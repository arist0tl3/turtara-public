import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  Box,
  Sheet,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  listItemButtonClasses,
  ListItemDecorator,
  ListItemContent,
  Divider,
  Input,
  Switch,
  Dropdown,
  Menu,
  MenuItem,
  MenuButton,
  Avatar as JoyAvatar,
} from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import { usePeopleByCurrentUserQuery, useTeamsByCurrentUserQuery, useLogoutMutation } from '../../generated';
import formatName from '../../utils/formatName';
import Avatar from '../Avatar';
import { useTheme } from '../../theme/ThemeProvider';
import { AccountCircle } from '@mui/icons-material';

const SIDEBAR_WIDTH = 220;

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: peopleData, loading: peopleLoading } = usePeopleByCurrentUserQuery();
  const { data: teamsData, loading: teamsLoading } = useTeamsByCurrentUserQuery();
  const { theme, toggleTheme } = useTheme();

  const people = peopleData?.peopleByCurrentUser;
  const teams = teamsData?.teamsByCurrentUser;

  const reports = people?.filter((person) => person.reportsToMe) || [];
  const nonReports = people?.filter((person) => !person.reportsToMe) || [];

  const isLoading = peopleLoading || teamsLoading;

  const [logout] = useLogoutMutation({
    refetchQueries: ['CurrentUser'],
    onCompleted: () => {
      localStorage.removeItem('auth_token');
    },
  });

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.mode === 'dark' ? 'neutral.900' : 'neutral.50' }}>
      {/* Mobile Header */}
      <Sheet
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '64px',
          zIndex: 9999,
          px: 2,
          bgcolor: theme.header.background,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} sx={{ color: theme.header.itemColor }}>
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {/* Logo and Title for Mobile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
          <JoyAvatar alt="Turtara Logo" src="/TurtaraLogo48Circle.png" size="sm" sx={{ borderRadius: '50%', width: 28, height: 28 }} />
          <Typography level="title-lg" sx={{ color: theme.header.itemColor, fontWeight: 'bold' }}>
            Turtara
          </Typography>
        </Box>

        {/* Search Input */}
        <Input
          size="sm"
          placeholder="Search..."
          startDecorator={<SearchIcon />}
          sx={{
            flexGrow: 1,
            maxWidth: 500,
            ml: 2,
            bgcolor: theme.header.searchBackground,
            '--Input-decoratorColor': theme.header.itemColor,
            '--Input-placeholderColor': theme.header.searchPlaceholderColor,
            color: theme.header.searchTextColor,
            border: 'none',
            '&:hover': {
              bgcolor: theme.header.searchHoverBackground,
            },
          }}
        />

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.header.itemColor }}>
            <DarkModeIcon sx={{ fontSize: 20, opacity: theme.mode === 'dark' ? 1 : 0.5 }} />
            <Switch
              size="sm"
              checked={theme.mode === 'light'}
              onChange={toggleTheme}
              sx={{
                '--Switch-thumb-size': '14px',
                '--Switch-track-width': '28px',
                '--Switch-track-height': '18px',
              }}
            />
            <LightModeIcon sx={{ fontSize: 20, opacity: theme.mode === 'dark' ? 0.5 : 1 }} />
          </Box>

          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
              sx={{ color: theme.header.itemColor }}
            >
              <AccountCircle />
            </MenuButton>
            <Menu
              placement="bottom-end"
              sx={{
                bgcolor: theme.person.cardBackground,
                color: theme.text.primary,
                boxShadow: 'md',
                p: 1,
              }}
            >
              <MenuItem
                onClick={handleLogout}
                sx={{
                  borderRadius: 'sm',
                  '&:hover': {
                    bgcolor: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  },
                }}
              >
                <ListItemDecorator>
                  <LogoutIcon />
                </ListItemDecorator>
                Logout
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </Sheet>

      {/* Sidebar for desktop */}
      <Sheet
        sx={{
          position: { xs: 'fixed', md: 'sticky' },
          transform: {
            xs: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            md: 'none',
          },
          transition: 'transform 0.3s, width 0.3s',
          zIndex: 10000,
          height: '100dvh',
          width: SIDEBAR_WIDTH,
          top: 0,
          p: 2,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: theme.sidebar.background,
        }}
      >
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, pl: 1 }}>
          <Link to="/" onClick={handleLinkClick} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <JoyAvatar alt="Turtara Logo" src="/TurtaraLogo48Circle.png" size="sm" sx={{ borderRadius: '50%', width: 32, height: 32 }} />
            <Typography level="title-lg" sx={{ color: theme.sidebar.itemColor, fontWeight: 'bold' }}>
              Turtara
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            minHeight: 0,
            overflow: 'hidden auto',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}
        >
          {!isLoading && (
            <>
              <List
                size="sm"
                sx={{
                  gap: 1,
                  '--List-nestedInsetStart': '30px',
                  '--ListItem-radius': (theme) => theme.vars.radius.sm,
                }}
              >
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to="/"
                    sx={{
                      borderRadius: 'sm',
                      color: theme.sidebar.itemColor,
                      '&:hover': {
                        bgcolor: theme.sidebar.hoverBackground,
                      },
                    }}
                    onClick={handleLinkClick}
                  >
                    <ListItemDecorator sx={{ color: 'inherit' }}>
                      <DashboardIcon />
                    </ListItemDecorator>
                    <ListItemContent>Dashboard</ListItemContent>
                  </ListItemButton>
                </ListItem>

                {!!reports.length && (
                  <Box sx={{ mt: 2 }}>
                    <Typography level="body-xs" sx={{ fontWeight: 'bold', color: theme.sidebar.itemColor, px: 2, pb: 1 }}>
                      DIRECT REPORTS
                    </Typography>
                    <Box role="group" sx={{ mb: 2 }}>
                      {reports.map((person) => (
                        <ListItem key={person._id}>
                          <ListItemButton
                            component={Link}
                            to={`/people/${person._id}`}
                            sx={{
                              borderRadius: 'sm',
                              color: theme.sidebar.itemColor,
                              '&:hover': {
                                bgcolor: theme.sidebar.hoverBackground,
                              },
                            }}
                            onClick={handleLinkClick}
                          >
                            <ListItemDecorator sx={{ color: 'inherit' }}>
                              {person.profileImageSrc ? (
                                <JoyAvatar alt={formatName(person)} src={person.profileImageSrc} size="sm" sx={{ width: 24, height: 24 }} />
                              ) : (
                                <PersonIcon fontSize="small" />
                              )}
                            </ListItemDecorator>
                            <ListItemContent>{formatName(person)}</ListItemContent>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </Box>
                  </Box>
                )}

                {!!nonReports.length && (
                  <Box>
                    <Typography level="body-xs" sx={{ fontWeight: 'bold', color: theme.sidebar.itemColor, px: 2, pb: 1 }}>
                      OTHERS
                    </Typography>
                    <Box role="group" sx={{ mb: 2 }}>
                      {nonReports.map((person) => (
                        <ListItem key={person._id}>
                          <ListItemButton
                            component={Link}
                            to={`/people/${person._id}`}
                            sx={{
                              borderRadius: 'sm',
                              color: theme.sidebar.itemColor,
                              '&:hover': {
                                bgcolor: theme.sidebar.hoverBackground,
                              },
                            }}
                            onClick={handleLinkClick}
                          >
                            <ListItemDecorator sx={{ color: 'inherit' }}>
                              {person.profileImageSrc ? (
                                <JoyAvatar alt={formatName(person)} src={person.profileImageSrc} size="sm" sx={{ width: 24, height: 24 }} />
                              ) : (
                                <PersonIcon fontSize="small" />
                              )}
                            </ListItemDecorator>
                            <ListItemContent>{formatName(person)}</ListItemContent>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </Box>
                  </Box>
                )}

                {!!teams?.length && (
                  <Box>
                    <Typography level="body-xs" sx={{ fontWeight: 'bold', color: theme.sidebar.itemColor, px: 2, pb: 1 }}>
                      TEAMS
                    </Typography>
                    <Box role="group" sx={{ mb: 2 }}>
                      {teams.map((team) => (
                        <ListItem key={team._id}>
                          <ListItemButton
                            component={Link}
                            to={`/teams/${team._id}`}
                            sx={{
                              borderRadius: 'sm',
                              color: theme.sidebar.itemColor,
                              '&:hover': {
                                bgcolor: theme.sidebar.hoverBackground,
                              },
                            }}
                            onClick={handleLinkClick}
                          >
                            <ListItemDecorator sx={{ color: 'inherit' }}>
                              <GroupIcon fontSize="small" />
                            </ListItemDecorator>
                            <ListItemContent>{team.name}</ListItemContent>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </Box>
                  </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <Divider sx={{ bgcolor: theme.sidebar.dividerColor }} />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      to="/settings"
                      sx={{
                        borderRadius: 'sm',
                        color: theme.sidebar.itemColor,
                        '&:hover': {
                          bgcolor: theme.sidebar.hoverBackground,
                        },
                      }}
                      onClick={handleLinkClick}
                    >
                      <ListItemDecorator sx={{ color: 'inherit' }}>
                        <SettingsIcon />
                      </ListItemDecorator>
                      <ListItemContent>Settings</ListItemContent>
                    </ListItemButton>
                  </ListItem>

                </Box>
              </List>
            </>
          )}
        </Box>
      </Sheet>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          mt: { xs: '64px', md: 0 },
        }}
      >
        {/* Desktop Header */}
        <Sheet
          sx={{
            display: { xs: 'none', md: 'flex' },
            px: 2,
            py: 1.5,
            alignItems: 'center',
            gap: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            zIndex: 999,
            bgcolor: theme.header.background,
          }}
        >
          <Input
            size="sm"
            placeholder="Search..."
            startDecorator={<SearchIcon />}
            sx={{
              flexGrow: 1,
              maxWidth: 500,
              bgcolor: theme.header.searchBackground,
              '--Input-decoratorColor': theme.header.itemColor,
              '--Input-placeholderColor': theme.header.searchPlaceholderColor,
              color: theme.header.searchTextColor,
              border: 'none',
              '&:hover': {
                bgcolor: theme.header.searchHoverBackground,
              },
            }}
          />

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: theme.header.itemColor,
              }}
            >
              <DarkModeIcon sx={{ fontSize: 20, opacity: theme.mode === 'dark' ? 1 : 0.5 }} />
              <Switch
                size="sm"
                checked={theme.mode === 'light'}
                onChange={toggleTheme}
                sx={{
                  '--Switch-thumb-size': '14px',
                  '--Switch-track-width': '28px',
                  '--Switch-track-height': '18px',
                }}
              />
              <LightModeIcon sx={{ fontSize: 20, opacity: theme.mode === 'dark' ? 0.5 : 1 }} />
            </Box>

            <Dropdown>
              <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                sx={{ color: theme.header.itemColor }}
              >
                <AccountCircle />
              </MenuButton>
              <Menu
                placement="bottom-end"
                sx={{
                  bgcolor: theme.person.cardBackground,
                  color: theme.text.primary,
                  boxShadow: 'md',
                  p: 1,
                }}
              >
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 'sm',
                    '&:hover': {
                      bgcolor: theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  <ListItemDecorator>
                    <LogoutIcon />
                  </ListItemDecorator>
                  Logout
                </MenuItem>
              </Menu>
            </Dropdown>
          </Box>
        </Sheet>

        {/* Page Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
