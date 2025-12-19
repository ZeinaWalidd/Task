import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import theme from './theme.ts';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
