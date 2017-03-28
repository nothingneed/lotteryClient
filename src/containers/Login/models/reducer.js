
import { fromJS } from 'immutable';

import {
    CHANGE_PHONENUMBER,
} from './constants';


const initialState = fromJS({
    authInfo: {
        phoneNumber: '',
    }
});

function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PHONENUMBER:
            return state
                .setIn(['authInfo','phoneNumber'], action.phoneNumber);
        default:
            return state;
    }
}

export default LoginReducer;
