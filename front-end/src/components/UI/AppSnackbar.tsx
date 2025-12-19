import { Snackbar, Alert, Slide } from '@mui/material';

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

export default function AppSnackbar({
  open,
  message,
  severity = 'info',
  onClose
}: AppSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      slots={{ transition: Slide}}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ borderRadius: 2 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
