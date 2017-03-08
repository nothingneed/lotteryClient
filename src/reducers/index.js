import { combineReducers } from 'redux'
import catalog from './catalog.js'
import catalogFilter from './catalogFilter.js'
import gameList from './gameList.js'
import {allClients,curClient,curRegion} from './allClients.js'
import {
	routerReducer
} from 'react-router-redux'


const rootReducer = combineReducers({
  // catalog,
  // catalogFilter,
    curClient,
    curRegion,
    allClients,
  routing: routerReducer
})



export default rootReducer
