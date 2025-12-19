import { type ReactNode } from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children
}: AuthLayoutProps) {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="grey.100"
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            textAlign="center"
            color="text.secondary"
            mb={3}
          >
            {subtitle}
          </Typography>
        )}

        {children}
      </Paper>
    </Box>
  );
}
