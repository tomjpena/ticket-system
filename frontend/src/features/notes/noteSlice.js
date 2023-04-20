import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from './noteService'

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// get notes
export const getNotes = createAsyncThunk('notes/getAll', async (ticketId, thunkAPI) => {
  try {
    // Use thunkAPI to get user token from the auth state
    const token = thunkAPI.getState().auth.user.token
    // Use the getTickets in the ticketService to get tickets in the db of the user making the request
    return await noteService.getNotes(ticketId, token)
  } catch (error) {
    // Look for error message
    const message = error.response.data.message

    // use thunkapi to handle error message
    return thunkAPI.rejectWithValue(message)
  }
})

//add notes
export const addNotes = createAsyncThunk('notes/create', async ({noteText, isStaff, ticketId}, thunkAPI) => {
  try {
    // Use thunkAPI to get user token from the auth state
    const token = thunkAPI.getState().auth.user.token
    // Use the getTickets in the ticketService to get tickets in the db of the user making the request
    return await noteService.addNotes(noteText, isStaff, ticketId, token)
  } catch (error) {
    // Look for error message
    const message = error.response.data.message

    // use thunkapi to handle error message
    return thunkAPI.rejectWithValue(message)
  }
})



export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload
        state.isLoading = false 
        state.isSuccess = true
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
  }
})

export const {reset} = noteSlice.actions

export default noteSlice.reducer