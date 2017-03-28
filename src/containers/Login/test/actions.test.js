import {
    CHANGE_PHONENUMBER,
} from '../models/constants';

import {
  changeLoginPhoneNumber,
} from '../models/actions';


describe('Login actions', () => {
  describe('changeLoginPhoneNumber', () => {
    it('应该返回正确的类型和号码', () => {
      const fixture = '13600000000';
      const expectedResult = {
        type: CHANGE_PHONENUMBER,
        phoneNumber: fixture,
      };
      expect(changeLoginPhoneNumber(fixture)).toEqual(expectedResult);
    });
  });
});
