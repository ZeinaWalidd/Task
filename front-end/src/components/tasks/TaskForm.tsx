import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  onSubmit: (title: string, description?: string) => void;
  onCancel?: () => void;
  initialTitle?: string;
  initialDescription?: string;
  formTitle?: string; 
}

export default function TaskForm({
  onSubmit,
  onCancel,
  initialTitle = '',
  initialDescription = '',
  formTitle = 'Add New Task', 
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription || '');

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription || '');
  }, [initialTitle, initialDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEditing = !!initialTitle;
    if (!isEditing && !title.trim()) {
      alert('Title is required.');
      return;
    }

    const finalTitle = title.trim() || initialTitle;
    const finalDescription = description.trim() === '' ? undefined : description.trim();

    onSubmit(finalTitle, finalDescription);

    if (!isEditing) {
      setTitle('');
      setDescription('');
    }
  };

  const isEditing = !!initialTitle;
  const Icon = isEditing ? EditIcon : AddTaskIcon;

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#ffffff', my: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Icon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h5" fontWeight={600} color="primary.main">
              {formTitle}
            </Typography>
          </Box>

          <TextField
            label="Task Title"
            placeholder="Enter task title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={!isEditing}
            fullWidth
            variant="outlined"
            slotProps={{
              input: {
                sx: { borderRadius: 2 },
              },
            }}
          />

          <TextField
            label="Description (optional)"
            placeholder="Add any details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            slotProps={{
              input: {
                sx: { borderRadius: 2 },
              },
            }}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<Icon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              {isEditing ? 'Update Task' : 'Add Task'}
            </Button>

            {onCancel && (
              <Button
                type="button"
                variant="outlined"
                size="large"
                onClick={onCancel}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}