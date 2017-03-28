

import {
    LOGIN,
    CHANGE_PHONENUMBER,
} from './constants';

/**
 * 用户登录
 *
 */
export function login() {
  return {
    type: LOGIN,
  };
}

/**
 * 用户输入电话号码登录
 *
 * @param  {phoneNumber} 登录用电话号码
 *
 */
export function changeLoginPhoneNumber(phoneNumber) {
  return {
    type: CHANGE_PHONENUMBER,
    phoneNumber,
  };
}