

import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
import { LOCATION_CHANGE } from 'react-router-redux';


import { login, loginWatcher } from '../models/sagas';

import { loginSuccess, loginError } from '../../App/models/actions';
import {requestLogin} from '../../../service';
import { LOGIN} from '../models/constants';

describe('login Saga', () => {
  let loginGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
      const authInfo= {
              phoneNumber: '321321',
          }
    loginGenerator = login();

    const selectDescriptor = loginGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = loginGenerator.next(authInfo).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('应该 dispatch the loginSuccess action 如果请求数据正确', () => {
    const userInfo = {
      userName: 'user X',
    };
    const putDescriptor = loginGenerator.next(userInfo).value;
    expect(putDescriptor).toEqual(put(loginSuccess(userInfo)));
  });

  it('应该 call the loginError action 如果sponse失败', () => {
    const response = new Error('Some error');
    const putDescriptor = loginGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(loginError(response)));
  });
});

describe('loginWatcher Saga', () => {
  const loginWatcherSaga = loginWatcher();
  const mockedTask = createMockTask();

  it('应该开始观察 LOGIN action', () => {
    const takeLatestDescriptor = loginWatcherSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOGIN, login));
  });

  it('应该 yield 直到 LOCATION_CHANGE action', () => {
    const takeDescriptor = loginWatcherSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('应该 取消 the forked task 当 LOCATION_CHANGE 发生', () => {
    const cancelDescriptor = loginWatcherSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});
