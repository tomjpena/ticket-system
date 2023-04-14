import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get use from localStorage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Exporting register function 
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    // Use the register in the authService to register the user in the db and get jwt
    return await authService.register(user)
  } catch (error) {
    // Look for error message in multiple places
    const message = error.response.data.message

    // use thunkapi to handle error message
    return thunkAPI.rejectWithValue(message)
  }
})

// Exporting login function 
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = error.response.data.message

    return thunkAPI.rejectWithValue(message)
  }
})

// Export Logout function
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// exporting authslice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => { //These will wait for any action that happens and call a function.
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isloading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isloading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isloading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isloading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

// exporting actions that are in the reducers object
export const {reset} = authSlice.actions
//exporting the authslice reducer
export default authSlice.reducer