import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:3000/tasks');
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post('http://localhost:3000/tasks', task);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.delete(`http://localhost:3000/tasks/${taskId}`);
  return taskId;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const response = await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
  return response.data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    toggleTaskCompletion(state, action) {
      const taskId = action.payload;
      const task = state.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return state.filter((task) => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          state[index] = updatedTask;
          
        }
        
      });
  },
});

export const { toggleTaskCompletion } = tasksSlice.actions;

export default tasksSlice.reducer;
