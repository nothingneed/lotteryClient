import { fromJS } from 'immutable';

import loginReducer from '../models/reducer';
import {
    changeLoginPhoneNumber,
} from '../models/actions';

describe('Login Reducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      authInfo: {
        phoneNumber: '',
      }
    });
  });

  it('应该正确 handle changeUsername action ', () => {
    const fixture = '1231321321';
    const expectedResult = state.setIn(['authInfo','phoneNumber'], fixture);

    expect(loginReducer(state, changeLoginPhoneNumber(fixture))).toEqual(expectedResult);
  });
});
