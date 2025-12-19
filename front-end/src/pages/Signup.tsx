import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Link
} from '@mui/material';

import AuthLayout from '../components/layout/AuthLayout';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(fullName, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        'Signup failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Get started in seconds"
    >
      {error && (
        <Typography color="error" textAlign="center" mb={2}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          fullWidth
          required
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <TextField
          label="Email address"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          helperText="8+ chars, number, letter, special character"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 3, py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>

        <Typography textAlign="center" mt={3} color="text.secondary">
          Already have an account?{' '}
          <Link component={RouterLink} to="/signin" underline="hover">
            Sign in
          </Link>
        </Typography>
      </form>
    </AuthLayout>
  );
}
