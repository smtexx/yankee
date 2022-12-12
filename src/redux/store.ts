import appDataReducer from './features/appData/appDataSlice';
import appStateReducer from './features/appState/appStateSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    data: appDataReducer,
    values: appStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
