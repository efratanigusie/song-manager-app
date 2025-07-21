 import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from './slices/songsSlice'; // Import the songs reducer
import rootSaga from './rootSaga'; // Import your root saga

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songsReducer, // Assign the songs slice reducer to the 'songs' key
    // Add other reducers here if you have more slices (e.g., users: usersReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable Redux Thunk as we are using Redux-Saga for async logic
    }).concat(sagaMiddleware), // Add sagaMiddleware to the middleware chain
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
