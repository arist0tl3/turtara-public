import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Typography, Link, Card, Divider, LinearProgress, Stack } from '@mui/joy';
import { gql, useMutation } from '@apollo/client';
import { useTheme } from '../../../theme/ThemeProvider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      token
      error
    }
  }
`;

// Password strength criteria
const passwordCriteria = [
  { id: 'length', label: 'At least 8 characters', test: (password: string) => password.length >= 8 },
  { id: 'uppercase', label: 'Contains uppercase letter', test: (password: string) => /[A-Z]/.test(password) },
  { id: 'lowercase', label: 'Contains lowercase letter', test: (password: string) => /[a-z]/.test(password) },
  { id: 'number', label: 'Contains number', test: (password: string) => /[0-9]/.test(password) },
  { id: 'special', label: 'Contains special character', test: (password: string) => /[^A-Za-z0-9]/.test(password) },
];

export default function Register() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [criteriaResults, setCriteriaResults] = useState<Record<string, boolean>>({});

  const [register] = useMutation(REGISTER_MUTATION, {
    refetchQueries: ['CurrentUser'],
    onError: (error) => {
      setError(error.message);
    },
    update: (cache, { data }) => {
      if (data.register.success) {
        localStorage.setItem('auth_token', data.register.token);
      } else {
        setError(data.register.error || 'An error occurred');
      }
    },
  });

  // Calculate password strength whenever password changes
  useEffect(() => {
    const results: Record<string, boolean> = {};
    let passedCriteria = 0;

    passwordCriteria.forEach((criterion) => {
      const passes = criterion.test(password);
      results[criterion.id] = passes;
      if (passes) passedCriteria++;
    });

    setCriteriaResults(results);
    setPasswordStrength((passedCriteria / passwordCriteria.length) * 100);
  }, [password]);

  const isPasswordStrong = passwordStrength >= 80; // At least 4 out of 5 criteria

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isPasswordStrong) {
      setError('Please create a stronger password');
      return;
    }

    try {
      await register({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Get color for strength indicator
  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'danger';
    if (passwordStrength < 80) return 'warning';
    return 'success';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.colors.formCard.background,
        p: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: theme.colors.formCard.background,
          boxShadow: 'lg',
          border: `1px solid ${theme.colors.formCard.border}`,
        }}
      >
        <Typography
          level="h4"
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            color: theme.text.primary,
          }}
        >
          <PersonAddOutlinedIcon />
          Create Account
        </Typography>

        <Divider sx={{ my: 2 }} />

        <form onSubmit={handleSubmit}>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel sx={{ color: theme.text.secondary }}>Email</FormLabel>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startDecorator={<EmailOutlinedIcon />}
              sx={{
                color: theme.text.primary,
                bgcolor: theme.colors.inputBackground,
                '--Input-decoratorColor': theme.text.secondary,
                '--Input-placeholderColor': theme.text.secondary,
                border: `1px solid ${theme.colors.formCard.border}`,
                '&:hover': {
                  bgcolor: theme.colors.formCard.background,
                },
                '&:focus-within': {
                  bgcolor: theme.colors.formCard.background,
                  borderColor: theme.person.headerBackground,
                },
              }}
            />
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <FormLabel sx={{ color: theme.text.secondary }}>Password</FormLabel>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startDecorator={<LockOutlinedIcon />}
              sx={{
                color: theme.text.primary,
                bgcolor: theme.colors.inputBackground,
                '--Input-decoratorColor': theme.text.secondary,
                '--Input-placeholderColor': theme.text.secondary,
                border: `1px solid ${theme.colors.formCard.border}`,
                '&:hover': {
                  bgcolor: theme.colors.formCard.background,
                },
                '&:focus-within': {
                  bgcolor: theme.colors.formCard.background,
                  borderColor: theme.person.headerBackground,
                },
              }}
            />

            {password && (
              <Box sx={{ mt: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                  <Typography level="body-sm" sx={{ color: theme.text.secondary }}>
                    Password Strength:
                  </Typography>
                  <LinearProgress determinate value={passwordStrength} color={getStrengthColor()} sx={{ flexGrow: 1 }} />
                </Stack>

                <Stack spacing={0.5} sx={{ mt: 1 }}>
                  {passwordCriteria.map((criterion) => (
                    <Stack
                      key={criterion.id}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        color: criteriaResults[criterion.id] ? 'success.500' : 'text.secondary',
                        fontSize: '0.75rem',
                      }}
                    >
                      {criteriaResults[criterion.id] ? (
                        <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                      ) : (
                        <CancelOutlinedIcon sx={{ fontSize: 16 }} />
                      )}
                      <Typography level="body-xs">{criterion.label}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <FormLabel sx={{ color: theme.text.secondary }}>Confirm Password</FormLabel>
            <Input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              startDecorator={<LockOutlinedIcon />}
              sx={{
                color: theme.text.primary,
                bgcolor: theme.colors.inputBackground,
                '--Input-decoratorColor': theme.text.secondary,
                '--Input-placeholderColor': theme.text.secondary,
                border: `1px solid ${theme.colors.formCard.border}`,
                '&:hover': {
                  bgcolor: theme.colors.formCard.background,
                },
                '&:focus-within': {
                  bgcolor: theme.colors.formCard.background,
                  borderColor: theme.person.headerBackground,
                },
              }}
            />
            {confirmPassword && password !== confirmPassword && (
              <Typography level="body-xs" sx={{ color: 'danger.500', mt: 0.5 }}>
                Passwords do not match
              </Typography>
            )}
          </FormControl>

          {error && (
            <Typography
              level="body-sm"
              sx={{
                color: 'danger.500',
                mb: 2,
                p: 1,
                bgcolor: theme.colors.notification.error.background,
                borderRadius: 'sm',
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            startDecorator={<PersonAddOutlinedIcon />}
            sx={{
              mb: 2,
              bgcolor: theme.person.headerBackground,
              color: theme.colors.buttonText,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: theme.colors.buttonPrimary.hover,
              },
              '&.Mui-disabled': {
                opacity: 0.7,
                color: theme.colors.buttonText,
                bgcolor: theme.colors.buttonPrimary.disabled,
              },
            }}
            disabled={!isPasswordStrong || password !== confirmPassword || !email}
          >
            Create Account
          </Button>

          <Typography
            level="body-sm"
            sx={{
              textAlign: 'center',
              color: theme.text.secondary,
            }}
          >
            Already have an account?{' '}
            <Link
              onClick={() => navigate('/login')}
              sx={{
                color: theme.text.primary,
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </Box>
  );
}
