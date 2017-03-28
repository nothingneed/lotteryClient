

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from './constants';

/**
 * 用户登录
 * @param  {object} userInfo 登录所需信息
 */
export function login(userInfo) {
  return {
    type: LOGIN,
    userInfo
  };
}

/**
 * 登录成功
 *
 * @param  {string} username 用户名
 *
 */
export function loginSuccess(userInfo) {
  return {
    type: LOGIN_SUCCESS,
    userInfo,
  };
}

/**
 * 登录失败
 *
 * @param  {object} error The error
 *
 */
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
