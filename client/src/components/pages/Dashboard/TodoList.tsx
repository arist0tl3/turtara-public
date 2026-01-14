import { useState } from 'react';
import { Box, Button, Card, Typography, Modal, Input, IconButton, Stack } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useUserTodosByCurrentUserQuery,
  useCreateUserTodoMutation,
  useCompleteUserTodoMutation,
  useUncompleteUserTodoMutation,
} from '../../../generated';
import { useTheme } from '../../../theme/ThemeProvider';

export default function TodoList() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState('');
  const { data, refetch } = useUserTodosByCurrentUserQuery();
  const [createTodo] = useCreateUserTodoMutation();
  const [completeTodo] = useCompleteUserTodoMutation();
  const [uncompleteTodo] = useUncompleteUserTodoMutation();

  const handleCreateTodo = async () => {
    if (!newTodoContent.trim()) return;

    try {
      await createTodo({
        variables: {
          input: {
            content: newTodoContent.trim(),
          },
        },
      });
      setNewTodoContent('');
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleCompleteTodo = async (todoId: string) => {
    try {
      await completeTodo({
        variables: {
          input: {
            todoId,
          },
        },
      });
      refetch();
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const handleUncompleteTodo = async (todoId: string) => {
    try {
      await uncompleteTodo({
        variables: {
          input: {
            todoId,
          },
        },
      });
      refetch();
    } catch (error) {
      console.error('Error uncompleting todo:', error);
    }
  };

  const twentyFourHoursAgo = moment().subtract(24, 'hours');
  const todos = (data?.userTodosByCurrentUser || [])
    .filter((todo) => !todo.completedAt || moment(todo.completedAt).isAfter(twentyFourHoursAgo))
    .sort((a, b) => {
      // First sort by completion status
      if (a.completedAt && !b.completedAt) return 1;
      if (!a.completedAt && b.completedAt) return -1;
      // Then by creation date within each group
      return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf();
    });

  return (
    <>
      <Card
        sx={{
          bgcolor: theme.person.cardBackground,
          height: '400px',
          border: 'none',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography level="h4" sx={{ color: theme.text.primary }}>
            Todo List
          </Typography>
          <Button
            variant="outlined"
            startDecorator={<AddIcon />}
            onClick={() => setIsModalOpen(true)}
            sx={{
              color: theme.text.primary,
              borderColor: theme.text.primary,
              '&:hover': {
                borderColor: theme.text.primary,
                bgcolor: theme.colors.actionButton.background,
              },
            }}
          >
            New Todo
          </Button>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            minHeight: 0,
            maxHeight: 'calc(400px - 80px)',
          }}
        >
          <AnimatePresence initial={false}>
            <Stack spacing={1}>
              {todos.map((todo) => (
                <motion.div
                  key={todo._id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    layout: { duration: 0.4 },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      opacity: todo.completedAt ? 0.6 : 1,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <IconButton
                      variant="plain"
                      onClick={() => (todo.completedAt ? handleUncompleteTodo(todo._id) : handleCompleteTodo(todo._id))}
                      sx={{
                        color: todo.completedAt ? '#4caf50' : theme.text.secondary,
                        '&:hover': {
                          bgcolor: theme.colors.actionButton.hover,
                        },
                      }}
                    >
                      {todo.completedAt ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                    </IconButton>
                    <Typography
                      sx={{
                        color: theme.text.primary,
                        textDecoration: todo.completedAt ? 'line-through' : 'none',
                        flex: 1,
                      }}
                    >
                      {todo.content}
                    </Typography>
                    <Typography level="body-xs" sx={{ color: theme.text.secondary }}>
                      {moment(todo.createdAt).format('MM/DD')}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Stack>
          </AnimatePresence>
        </Box>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: 400,
            bgcolor: theme.person.cardBackground,
            boxShadow: 'lg',
            border: `1px solid ${theme.colors.border.subtle}`,
          }}
        >
          <Typography level="h4" sx={{ mb: 2, color: theme.text.primary }}>
            New Todo
          </Typography>
          <Input
            autoFocus
            placeholder="What needs to be done?"
            value={newTodoContent}
            onChange={(e) => setNewTodoContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCreateTodo();
              }
            }}
            sx={{
              mb: 2,
              '--Input-decoratorChildHeight': '45px',
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setIsModalOpen(false)}
              sx={{
                color: theme.text.primary,
                '&:hover': {
                  bgcolor: theme.colors.actionButton.hover,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTodo}
              sx={{
                '&:hover': {
                  bgcolor: theme.colors.success,
                },
              }}
            >
              Create
            </Button>
          </Box>
        </Card>
      </Modal>
    </>
  );
}
