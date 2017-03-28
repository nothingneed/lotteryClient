/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');

const makeSelectAuthInfo = () => createSelector(
    selectLogin,
    (homeState) => homeState.get('authInfo')
);

export {
    selectLogin,
    makeSelectAuthInfo,
};
