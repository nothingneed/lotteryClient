import { fromJS } from 'immutable';

import {
    makeSelectAuthInfo,
} from '../selectors';


describe('makeSelectAuthInfo', () => {
  const AuthInfoSelector = makeSelectAuthInfo();
  it('应该select 登录信息', () => {
    const phoneNumber = '312321321';
    const mockedState = fromJS({
        login: {
            authInfo: {
                phoneNumber,
            }
        }
    });
      const expectedResult =fromJS({
              phoneNumber,
      })
    expect(AuthInfoSelector(mockedState)).toEqual(expectedResult);
  });
});
