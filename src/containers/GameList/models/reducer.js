/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';


import {
    LOAD_GAMELIST,
    LOAD_GAMELIST_SUCCESS,
    LOAD_GAMELIST_ERROR
} from './constants';



// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  timestamp: null,
  type: null,
  list: [],
});

function gameListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GAMELIST:
      return state
          .set('loading', true)
          .set('error', false)
    case LOAD_GAMELIST_SUCCESS:
      console.log(`get action ${JSON.stringify(action)}`)
      return state
          .set('list', action.gameList)
          .set('loading', false)
    case LOAD_GAMELIST_ERROR:
      return state
          .set('error', action.error)
          .set('loading', false);
    default:
      return state;
  }
}

export default gameListReducer;

