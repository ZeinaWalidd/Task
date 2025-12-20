import { motion } from 'framer-motion';
import {
  Box,
  Stack,
  Typography,
  Checkbox,
  Fab,
  Tooltip,
} from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { type Task } from '../../hooks/useTasks';

interface Props {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Box
      component={motion.div}
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      sx={{
        px: 2,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        '&:hover': {
          bgcolor: 'grey.50',
        },
      }}
    >
      <Checkbox
        checked={task.completed}
        onChange={onToggle}
      />

      <Box flex={1}>
        <Typography
          fontWeight={500}
          sx={{
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'text.secondary' : 'text.primary',
          }}
        >
          {task.title}
        </Typography>

        {task.description && (
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        )}
      </Box>

      <Stack direction="row" spacing={1}>
        <Tooltip title="Edit">
          <Fab
            size="small"
            color="primary"
            onClick={onEdit}
            sx={{
              minHeight: 32,
              width: 32,
              height: 32,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 1,
              },
            }}
          >
            <EditOutlinedIcon fontSize="small" />
          </Fab>
        </Tooltip>

        <Tooltip title="Delete">
          <Fab
            size="small"
            color="default"
            onClick={onDelete}
            sx={{
              minHeight: 32,
              width: 32,
              height: 32,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'error.light',
                color: 'error.contrastText',
                boxShadow: 1,
              },
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </Fab>
        </Tooltip>
      </Stack>
    </Box>
  );
}
