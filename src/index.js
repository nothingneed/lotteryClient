import 'babel-polyfill'//浏览器填缝工具   打包后大约95k,如只在特定浏览器运行,可不使用
import React from 'react'
import ReactDOM from 'react-dom' //14版本以后，reactDom已从React中分离
import { Provider } from 'react-redux' //Provider将redux数据结构与react绑定
import GameDetail from 'GameDetail'
import App from 'App'
import Game from 'Game'



import configureStore from './store/configureStore'
import {
	startWscClient
} from './actions'


import {
	Router,
	Route,
	IndexRoute,
	browserHistory,
	hashHistory
} from 'react-router'

import {syncHistoryWithStore} from 'react-router-redux'

console.log('start')

const store = configureStore() //{catalog:_catalog}//配置仓库，传入的同构数据如果使用combineReducers处理，则必须是带同样key的普通对象
const history = syncHistoryWithStore(hashHistory, store)

store.dispatch(startWscClient())


const rootEl = document.getElementById('root')
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Game}/>
			<Route path="/gameDetail/:clientID" component={GameDetail}/>
		</Route>
		</Router>
	</Provider>,
	rootEl

)

