import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'

// here we have one reducer called: auth, which is the authReducer from authSlice
export const store = configureStore({
  reducer: { 
    auth: authReducer,
  }
});
