
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { loginSuccess, loginError } from './actions';
import {requestLogin} from 'src/service';
import { LOGIN} from './constants';

/**
 * saga worker
 */
export function* login(action) {

  try {

    console.log('LOGINININ')
    const userInfo = yield call(requestLogin,action.userInfo);
    yield put(loginSuccess(userInfo));
  } catch (err) {
    yield put(loginError(err));
  }
}

/**
 * saga watcher
 */
export function* getGameListWatcher() {
  // takeLatest 会自动取消之前未完成的所有任务
  const watcher = yield takeLatest(LOGIN, login);
  // 如果中途切换location, 则取消执行
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  getGameListWatcher,
];
