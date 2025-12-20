import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { Box, AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import AppSnackbar from '../components/UI/AppSnackbar';
import { useSnackbar } from '../hooks/useSnackbar';

import { useTasks, type Task } from '../hooks/useTasks';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);


  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();


  const handleSubmitTask = async (title: string, description?: string) => {
    if (editingTask) {
      await updateTask(editingTask.id, { title, description });
      setEditingTask(null);
      showSnackbar('Task updated!', 'success');
    } else {
      await addTask(title, description);
      showSnackbar('Task added!', 'success');
    }
  };

  const handleToggleTask = (task: Task) =>
    updateTask(task.id, { completed: !task.completed });

  const handleDeleteRequest = (id: number) => {
    setTaskToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    await deleteTask(taskToDelete);
    showSnackbar('Task deleted!', 'success');
    setConfirmDeleteOpen(false);
    setTaskToDelete(null);
  };


  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
          <AssignmentIcon sx={{fontSize:25, color: 'primary.main', marginRight: 1}} />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1, color: 'primary.main'}}>
            My Tasks
          </Typography>

          <Typography sx={{ mr: 2, color: 'primary.main' }}>
            Welcome, <strong>{user?.fullName}</strong>
          </Typography>

          <Tooltip title="Logout">
            <IconButton onClick={() => setLogoutOpen(true)}>
              <LogoutOutlinedIcon sx={{color: 'primary.main'}}/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box maxWidth={1200} mx="auto" px={2} py={4}>
          <TaskForm
            onSubmit={handleSubmitTask}  
            initialTitle={editingTask?.title}
            initialDescription={editingTask?.description || ''}
            onCancel={() => setEditingTask(null)}
            formTitle={editingTask ? 'Edit Task' : 'Add New Task'}
          />
        
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onEdit={setEditingTask}
          onDelete={handleDeleteRequest}
        />
      </Box>

      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDeleteOpen(false)}
      />

      <ConfirmDialog
        open={logoutOpen}
        title="Sign out"
        description="Are you sure you want to log out?"
        confirmText="Logout"
        onConfirm={() => {
          logout();
          navigate('/signin');
        }}
        onCancel={() => setLogoutOpen(false)}
      />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Box>
  );
}
