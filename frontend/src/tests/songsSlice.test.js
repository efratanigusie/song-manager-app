import songsReducer, {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
} from '../redux/slices/songsSlice';

describe('songsSlice reducers', () => {
  const initialState = {
    list: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(songsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchSongsRequest correctly', () => {
    const action = fetchSongsRequest();
    const state = songsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchSongsSuccess correctly', () => {
    const songs = [{ id: '1', title: 'Song 1' }];
    const action = fetchSongsSuccess(songs);
    const state = songsReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.list).toEqual(songs);
  });

  it('should handle fetchSongsFailure correctly', () => {
    const error = 'Failed to fetch';
    const action = fetchSongsFailure(error);
    const state = songsReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.list).toEqual([]); // List should be cleared on failure
  });

  it('should handle addSongSuccess correctly', () => {
    const newSong = { id: '2', title: 'New Song' };
    const action = addSongSuccess(newSong);
    const state = songsReducer(initialState, action);
    expect(state.loading).toBe(false); // Assuming loading is handled by saga/request
    expect(state.list).toEqual([newSong]);
  });

  it('should handle updateSongSuccess correctly', () => {
    const existingState = {
      list: [{ id: '1', title: 'Song 1', artist: 'Artist A' }],
      loading: false,
      error: null,
    };
    const updatedSong = { id: '1', title: 'Updated Song 1', artist: 'Artist B' };
    const action = updateSongSuccess(updatedSong);
    const state = songsReducer(existingState, action);
    expect(state.loading).toBe(false);
    expect(state.list).toEqual([updatedSong]);
  });

  it('should handle deleteSongSuccess correctly', () => {
    const existingState = {
      list: [{ id: '1', title: 'Song 1' }, { id: '2', title: 'Song 2' }],
      loading: false,
      error: null,
    };
    const songIdToDelete = '1';
    const action = deleteSongSuccess(songIdToDelete);
    const state = songsReducer(existingState, action);
    expect(state.loading).toBe(false);
    expect(state.list).toEqual([{ id: '2', title: 'Song 2' }]);
  });
});