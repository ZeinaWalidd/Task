import { useState, useEffect } from 'react';

import {
  Box,
  Button,
  TextField,
  Stack
} from '@mui/material';

interface Props {
  onSubmit: (title: string, description?: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  onCancel?: () => void;
}

export default function TaskForm({
  onSubmit,
  initialTitle = '',
  initialDescription = '',
  onCancel
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription || '');

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription || '');
  }, [initialTitle, initialDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!initialTitle && !title.trim()) {
      alert('Title is required.');
      return;
    }

    const finalTitle = title.trim() || initialTitle;
    const finalDescription =
      description.trim() === '' ? undefined : description.trim();

    onSubmit(finalTitle, finalDescription);

    if (!initialTitle) {
      setTitle('');
      setDescription('');
    }
  };

  const isEditing = !!initialTitle;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Task title"
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={!isEditing}
          fullWidth
        />

        <TextField
          label="Description"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outlined"
              color="inherit"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
