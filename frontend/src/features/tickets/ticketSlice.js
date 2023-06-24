import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// export create ticket
export const createTicket = createAsyncThunk('tickets/create', async (ticketData, thunkAPI) => {
  try {
    // Use thunkAPI to get user token from the auth state
    const token = thunkAPI.getState().auth.user.token
    // Use the createTicket in the ticketService to create the ticket in the db if the user is authorized and has a token
    return await ticketService.createTicket(ticketData, token)
  } catch (error) {
    // Look for error message
    const message = error.response.data.message

    // use thunkapi to handle error message
    return thunkAPI.rejectWithValue(message)
  }
})

// get users tickets
export const getTickets = createAsyncThunk('tickets/getAll', async (_, thunkAPI) => {
  try {
    // Use thunkAPI to get user token from the auth state
    const token = thunkAPI.getState().auth.user.token
    // Use the getTickets in the ticketService to get tickets in the db of the user making the request
    return await ticketService.getTickets(token)
  } catch (error) {
    // Look for error message
    const message = error.response.data.message

    // use thunkapi to handle error message
    return thunkAPI.rejectWithValue(message)
  }
})

// get users tickets
export const getTicketsAdmin = createAsyncThunk('tickets/getAllAdmin', async (_, thunkAPI) => {
  try {
    // Use thunkAPI to get user token from the auth state
    const token = thunkAPI.getState().auth.user.token
    // Use the getTickets in the ticketService to get tickets in the db of the user making the request
    return await ticketService.getTicketsAdmin(token)
  } catch (error) {
    // Look for error message
    const message = error.response.data.message

    // use thunkapi to handle error message
    return thunkAPI.rejectWithValue(message)
  }
})


// get single ticket
export const getSingleTicket = createAsyncThunk('tickets/get', async (ticketId, thunkAPI) => {
  try {
    // Use thunkAPI to get user token from the auth state
    const token = thunkAPI.getState().auth.user.token
    // Use the getTickets in the ticketService to get tickets in the db of the user making the request
    return await ticketService.getSingleTicket(ticketId, token)
  } catch (error) {
    // Look for error message
    const message = error.response.data.message

    // use thunkapi to handle error message
    return thunkAPI.rejectWithValue(message)
  }
})

// close ticket
export const closeTicket = createAsyncThunk('tickets/close', async (ticketId, thunkAPI) => {
  try {
    // Use thunkAPI to get user token from the auth state
    const token = thunkAPI.getState().auth.user.token
    // Use the getTickets in the ticketService to get tickets in the db of the user making the request
    return await ticketService.closeTicket(ticketId, token)
  } catch (error) {
    // Look for error message
    const message = error.response.data.message

    // use thunkapi to handle error message
    return thunkAPI.rejectWithValue(message)
  }
})

// update ticket status
export const changeTicketStatus = createAsyncThunk('tickets/update', async (ticketId, thunkAPI) => {
  try {
    // Use thunkAPI to get user token from the auth state
    const token = thunkAPI.getState().auth.user.token
    // Use the getTickets in the ticketService to get tickets in the db of the user making the request
    return await ticketService.changeTicketStatus(ticketId, token)
  } catch (error) {
    // Look for error message
    const message = error.response.data.message

    // use thunkapi to handle error message
    return thunkAPI.rejectWithValue(message)
  }
})

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false 
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload
        state.isLoading = false 
        state.isSuccess = true
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSingleTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleTicket.fulfilled, (state, action) => {
        state.ticket = action.payload
        state.isLoading = false 
        state.isSuccess = true
      })
      .addCase(getSingleTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.tickets = state.tickets.map(ticket => {
          if (ticket._id === action.payload._id) {
            return { ...ticket, status: 'closed' };
          }
          return ticket;
        })
      })
      .addCase(getTicketsAdmin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTicketsAdmin.fulfilled, (state, action) => {
        state.tickets = action.payload
        state.isLoading = false 
        state.isSuccess = true
      })
      .addCase(getTicketsAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(changeTicketStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changeTicketStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTicket = action.payload;
        state.tickets = state.tickets.map(ticket => {
          if (ticket._id === updatedTicket._id) {
            return updatedTicket;
          }
          return ticket;
        })
      })
      .addCase(changeTicketStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
      
  }
})

export const {reset} = ticketSlice.actions

export default ticketSlice.reducer