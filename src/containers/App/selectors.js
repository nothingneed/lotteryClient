
import {createSelector} from 'reselect';

const selectGlobal = (state) => {
    console.log('selectGlobal',state)
    return state.get('global');
}

/**
 * 返回用户是否登录
 *
 * @return {bool} 是否已登录
 */
const makeSelectLogin = () => createSelector(
    selectGlobal,
    (globalState) => {
        console.log('makeSelectLogin',globalState)
        return globalState.getIn(['userData', 'login'])

    }
);
const makeSelectLogin123 = (state) => {
    console.log('makeSelectLogin123', state)
    return state.getIn(['global','userData', 'login'])
}

/**
 * 返回已登录用户名
 *
 * @return {string} 如果已登录返回用户名, 否则返回full
 */
const makeSelectUserName = () => createSelector(
    selectGlobal,
    (globalState) => globalState.getIn(['userData', 'userName'])
);

/**
 * 返回路由状态
 *
 * @return {object} 返回路由对象
 */
const makeSelectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

export {
    selectGlobal,
    makeSelectLogin,
    makeSelectUserName,
    makeSelectLocationState,
    makeSelectLogin123,
};
