import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './Reducers/dataReducer';

// Create store to store reducers
const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;