import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'

//reducers get imported into the store
export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});
