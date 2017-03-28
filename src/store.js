import {createStore, applyMiddleware, compose} from 'redux';
import {fromJS} from 'immutable';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import {createLogger} from 'redux-logger'
const sagaMiddleware = createSagaMiddleware();
import {Iterable}  from 'immutable';
export default function configureStore(initialState = {}, history) {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    const logger = createLogger({
        stateTransformer: (state) => {
            let newState = {};

            if (Iterable.isIterable(state)) {
                newState = state.toJS();
            }
            return newState;
        }
    });

    const middlewares = process.env.NODE_ENV === 'production' ?
        [sagaMiddleware, routerMiddleware(history)] :
        [sagaMiddleware, routerMiddleware(history), logger]

    const store = createStore(
        createReducer(),
        fromJS(initialState),
        applyMiddleware(...middlewares)
    );

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {}; // Async reducer registry

    // Make reducers hot reloadable
    /* istanbul ignore next */
    // if (module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         console.log(`hot --- laod reducers`)
    //         import
    //         ('./reducers').then((reducerModule) => {
    //             const createReducers = reducerModule.default;
    //             const nextReducers = createReducers(store.asyncReducers);
    //
    //             store.replaceReducer(nextReducers);
    //         });
    //     });
    // }

    return store;
}

