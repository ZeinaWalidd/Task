import { AnimatePresence } from 'framer-motion';
import { Paper, Stack, Divider } from '@mui/material';
import TaskItem from './TaskItem';
import { type Task } from '../../hooks/useTasks';

interface Props {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Paper elevation={2} sx={{borderRadius: 2, overflow:'hidden'}}>
      <AnimatePresence>
        <Stack divider={<Divider />}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggle(task)}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task.id)}
            />
          ))}
        </Stack>
      </AnimatePresence>
    </Paper>
  );
}
