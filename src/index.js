import 'babel-polyfill'//浏览器填缝工具   打包后大约95k,如只在特定浏览器运行,可不使用
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {createStore, applyMiddleware} from 'redux'
import {makeSelectLocationState} from 'containers/App/selectors';

import createRoutes from './routes';
import App from './containers/App';
//import { useScroll } from 'react-router-scroll';

import configureStore from './store'

const initialState = {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: makeSelectLocationState(),
});


const rootRoute = {
    component: App,
    childRoutes: createRoutes(store),
};

const rootEl = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>

        <Router
            history={history}
            routes={rootRoute}
        />
    </Provider>,
    rootEl
)

