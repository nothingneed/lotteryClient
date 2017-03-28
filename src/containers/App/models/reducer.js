import {fromJS} from 'immutable';

import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from './constants';

const initialState = fromJS({
    userData: {
        login: false,
        userName: null,
        error: null
    },
});

function appReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case LOGIN_SUCCESS:
            return state
                .setIn(['userData', 'login'], true)
                .setIn(['userData', 'userName'], action.userInfo.userName)
        case LOGIN_ERROR:
            return state
                .setIn(['userData', 'login'], false)
                .setIn(['userData', 'userName'], null)
                .setIn(['userData', 'error'], action.error)
        default:
            return state;
    }
}

export default appReducer;
