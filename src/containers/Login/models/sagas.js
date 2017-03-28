
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { loginSuccess, loginError } from '../../App/models/actions';
import {requestLogin} from '../../../service';
import { LOGIN} from './constants';
import { makeSelectAuthInfo } from '../selectors';
import { browserHistory } from 'react-router'
/**
 * saga worker
 */
export function* login(action) {

  try {

    const authInfo = yield select(makeSelectAuthInfo())
    const userInfo = yield call(requestLogin,authInfo);
    yield put(loginSuccess(userInfo));
    const router = yield select((state) => state.getIn(['route',"locationBeforeTransitions",'query',"return_to"]))
    console.log('browserHistory',router)
    browserHistory.push(router);
  } catch (err) {
    yield put(loginError(err));
  }
}

/**
 * saga watcher
 */
export function* loginWatcher() {
  // takeLatest 会自动取消之前未完成的所有任务
  const watcher = yield takeLatest(LOGIN, login);
  // 如果中途切换location, 则取消执行
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  loginWatcher,
];
