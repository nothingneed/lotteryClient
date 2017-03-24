
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { gameListLoaded, gameListLoadingError } from './actions';
import {requestGameList} from 'src/service';
import { LOAD_GAMELIST} from './constants';

/**
 * saga worker
 */
export function* getGameList(action) {

  try {
    const list = yield call(requestGameList,action.gameType);
    yield put(gameListLoaded(list, action.gameType));
  } catch (err) {
    yield put(gameListLoadingError(err));
  }
}

/**
 * saga watcher
 */
export function* getGameListWatcher() {
  // takeLatest 会自动取消之前未完成的所有任务
  const watcher = yield takeLatest(LOAD_GAMELIST, getGameList);

  // 如果中途切换location, 则取消执行
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  getGameListWatcher,
];
