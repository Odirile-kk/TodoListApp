import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    email : '',
    password: '',
    validate: false,
    currentUser: null,
    error: null,
  }

export const registerUser = createAsyncThunk('user/registerUser', async (_, thunkAPI) => {

    const {email, password} = thunkAPI.getState().user

    console.log("data : " + email + " " + password)
    try {
        // Validate user input
        if (email && password) {
          // Check if user already exists
          const response = await axios.get(`http://localhost:3001/register?email=${email}`);
          //
          //'http://localhost:3001/register', { email, password }
          if (response.data.length > 0) {
            alert('Email already registered');
           
          } else {
            // Create new user
            const newUser = { email, password };
            await axios.post('http://localhost:3001/register', newUser);
            alert('registered successfully');
            return response.data
          }
        } 
      } catch (error) {
        console.error('Error registering user:', error);
      }
});

export const loginUser = createAsyncThunk('users/loginUser', async (_, thunkAPI) => {
 
  const {email, password} = thunkAPI.getState().user
  console.log("data : " + email + " " + password)

  try {
    // Validate user input
    if (email && password) {
      // Check if user exists and credentials are correct
      const response = await axios.get(`http://localhost:3001/register?email=${email}&password=${password}`);

      if (response.data.length > 0) {
        alert('login successful');
      } else {
        alert('Invalid email or password');
        return response.data;
      }
    } else {
      alert('Please enter both email and password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
  });
  

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
        state.email = action.payload;
    },
    setPassword: (state, action) => {
        state.password = action.payload;
    },
    setValidate: (state) => {
        state.validate = true
    }
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        
      })
      .addCase(loginUser.rejected, (state, action) => {
     
      });
  },
});

export const { setEmail, setPassword, setValidate, validate} = userSlice.actions;

export default userSlice.reducer;
