import { all } from 'redux-saga/effects';
import watchSongs from './sagas/songsSaga';

// rootSaga is the single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchSongs(),
    // Add other watcher sagas here if you have more slices (e.g., watchUsers())
  ]);
} 
