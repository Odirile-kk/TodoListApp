import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './components/tasksSlice';
import userReducer from './components/userSlice';

const store = configureStore({
    reducer: {
      tasks: tasksReducer,
      user: userReducer,
    },
  });
  
  export default store;