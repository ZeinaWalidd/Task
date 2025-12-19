import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide
} from '@mui/material';

import { forwardRef } from 'react';
import type { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  return (
    <Dialog 
        open={open} 
        onClose={onCancel}
        slots={{ transition: Transition }}
        slotProps={{
            paper: {
                sx: {
                    borderRadius: 3,
                    px: 1,
                }
            }
        }}
    >
      <DialogTitle sx={{fontWeight: 600}}>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ color: 'text.secondary' }}>
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button 
            onClick={onCancel}
            variant='text'
            sx={{
                color: 'text.secondary',
                borderRadius: '10px',
                px: 2,
                '&:hover': {
                    bgcolor: 'grey.100',
                    color: 'text.primary',
                },
            }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            color: '#fff',
            borderRadius: '10px',
            px: 3,
            boxShadow: 'none',
            '&:hover': {
                bgcolor: 'primary.dark',
                boxShadow: 'none',
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
