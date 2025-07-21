import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    list: [],
    loading: false,
    error: null,
    // Add pagination specific state if you want to manage it globally
    // currentPage: 1,
    // songsPerPage: 5,
  },
  reducers: {
    // Action to trigger song fetch (saga will listen to this)
    fetchSongsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Action dispatched when songs are successfully fetched
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    // Action dispatched when fetching songs fails
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.list = []; // Clear list on error
    },
    // Action for adding a song (will be handled by saga)
    addSongRequest: (state) => {
      state.loading = true; // Set loading true for add operation
      state.error = null;
    },
    addSongSuccess: (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add new song to the list
    },
    addSongFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    // Action for updating a song (will be handled by saga)
    updateSongRequest: (state) => {
        state.loading = true;
        state.error = null;
    },
    updateSongSuccess: (state, action) => {
        state.loading = false;
        // Find and replace the updated song
        state.list = state.list.map(song =>
            song.id === action.payload.id ? action.payload : song
        );
    },
    updateSongFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    // Action for deleting a song (will be handled by saga)
    deleteSongRequest: (state) => {
        state.loading = true;
        state.error = null;
    },
    deleteSongSuccess: (state, action) => {
        state.loading = false;
        // Remove the deleted song from the list
        state.list = state.list.filter(song => song.id !== action.payload);
    },
    deleteSongFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;