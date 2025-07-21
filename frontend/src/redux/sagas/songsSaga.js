import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import watchSongs, {
  fetchSongsSaga,
  addSongSaga,
  updateSongSaga,
  deleteSongSaga,
} from '../sagas/songsSaga';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  addSongFailure,
  updateSongSuccess,
  updateSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
} from '../slices/songsSlice';

const API_BASE_URL = 'http://localhost:5000'; // or use process.env if configured

global.fetch = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('songs sagas', () => {
  it('fetchSongsSaga success', () => {
    const fakeSongs = [{ id: 1, title: 'Song 1' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(fakeSongs),
    });

    return expectSaga(fetchSongsSaga)
      .put(fetchSongsSuccess(fakeSongs))
      .run();
  });

  it('fetchSongsSaga failure', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    return expectSaga(fetchSongsSaga)
      .put(fetchSongsFailure('HTTP error! status: 500'))
      .run();
  });

  it('addSongSaga success', () => {
    const newSong = { title: 'New Song' };
    const returnedSong = { id: 5, title: 'New Song' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(returnedSong),
    });

    return expectSaga(addSongSaga, { payload: newSong })
      .put(addSongSuccess(returnedSong))
      .put(fetchSongsRequest())
      .run();
  });

  it('addSongSaga failure', () => {
    const newSong = { title: 'New Song' };

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    return expectSaga(addSongSaga, { payload: newSong })
      .put(addSongFailure('HTTP error! status: 400'))
      .run();
  });

  it('updateSongSaga success', () => {
    const payload = {
      id: 3,
      updatedSongData: { title: 'Updated Song' },
    };
    const updatedSong = { id: 3, title: 'Updated Song' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(updatedSong),
    });

    return expectSaga(updateSongSaga, { payload })
      .put(updateSongSuccess(updatedSong))
      .put(fetchSongsRequest())
      .run();
  });

  it('updateSongSaga failure', () => {
    const payload = {
      id: 3,
      updatedSongData: { title: 'Updated Song' },
    };

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    return expectSaga(updateSongSaga, { payload })
      .put(updateSongFailure('HTTP error! status: 404'))
      .run();
  });

  it('deleteSongSaga success (204)', () => {
    const songId = 3;

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 204,
    });

    return expectSaga(deleteSongSaga, { payload: songId })
      .put(deleteSongSuccess(songId))
      .put(fetchSongsRequest())
      .run();
  });

  it('deleteSongSaga failure with error response', () => {
    const songId = 3;

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: () => Promise.resolve('Server error'),
    });

    return expectSaga(deleteSongSaga, { payload: songId })
      .put(deleteSongFailure('HTTP error! status: 500 - Server error'))
      .run();
  });
});
