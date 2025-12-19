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

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signin(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue"
    >
      {error && (
        <Typography color="error" textAlign="center" mb={2}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
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
          {loading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>

        <Typography textAlign="center" mt={3} color="text.secondary">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} to="/signup" underline="hover">
            Sign up
          </Link>
        </Typography>
      </form>
    </AuthLayout>
  );
}
