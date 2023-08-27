import { configureStore } from '@reduxjs/toolkit';
import taxiReducer from './slices/taxiSlice';

export const store = configureStore({
  reducer: {
    taxi: taxiReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
