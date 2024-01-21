import { configureStore } from '@reduxjs/toolkit';
import hotelsApi from './api';
import hotelSlice from './hotelSlice';
// ...

export const store = configureStore({
  reducer: {
    hotelSlice: hotelSlice,
    [hotelsApi.reducerPath]: hotelsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hotelsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
