import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Typography, Link, Card, Divider } from '@mui/joy';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useTheme } from '../../../theme/ThemeProvider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      token
      error
    }
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data } = await login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    if (data?.login?.success && data.login.token) {
      localStorage.setItem('auth_token', data.login.token);
      await apolloClient.refetchQueries({ include: ['CurrentUser'] });
      return;
    }

    setError(data?.login?.error || 'An error occurred');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: theme.dashboard.background,
        p: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '400px',
          p: 3,
          bgcolor: theme.person.cardBackground,
          borderRadius: 'sm',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography
            level="h3"
            sx={{
              color: theme.text.primary,
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              color: theme.text.secondary,
              textAlign: 'center',
            }}
          >
            Sign in to continue to your dashboard
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <form onSubmit={handleSubmit}>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel sx={{ color: theme.text.primary }}>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              startDecorator={<EmailOutlinedIcon />}
              sx={{
                color: theme.text.primary,
                '--Input-decoratorColor': theme.text.secondary,
                bgcolor: theme.colors.inputBackground,
                border: `1px solid ${theme.colors.formCard.border}`,
                '&:hover': {
                  bgcolor: theme.colors.formCard.hover,
                },
                '&:focus-within': {
                  bgcolor: theme.colors.formCard.focus,
                  borderColor: theme.person.headerBackground,
                },
              }}
            />
          </FormControl>

          <FormControl sx={{ mb: 3 }}>
            <FormLabel sx={{ color: theme.text.primary }}>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              startDecorator={<LockOutlinedIcon />}
              sx={{
                color: theme.text.primary,
                '--Input-decoratorColor': theme.text.secondary,
                bgcolor: theme.colors.inputBackground,
                border: `1px solid ${theme.colors.formCard.border}`,
                '&:hover': {
                  bgcolor: theme.colors.formCard.hover,
                },
                '&:focus-within': {
                  bgcolor: theme.colors.formCard.focus,
                  borderColor: theme.person.headerBackground,
                },
              }}
            />
          </FormControl>

          {error && (
            <Typography
              level="body-sm"
              sx={{
                color: theme.colors.notification.error.text,
                mb: 2,
                p: 1,
                bgcolor: theme.colors.notification.error.background,
                borderRadius: 'sm',
                textAlign: 'center',
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            sx={{
              mb: 2,
              bgcolor: theme.person.headerBackground,
              color: theme.colors.buttonText,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: theme.colors.buttonPrimary.hover,
              },
            }}
          >
            Sign In
          </Button>

          <Typography
            level="body-sm"
            sx={{
              textAlign: 'center',
              color: theme.text.secondary,
            }}
          >
            Don't have an account?{' '}
            <Link
              onClick={() => navigate('/register')}
              sx={{
                color: theme.text.primary,
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Register
            </Link>
          </Typography>
        </form>
      </Card>
    </Box>
  );
}
