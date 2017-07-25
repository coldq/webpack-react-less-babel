// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import count from './countReducer';
 import asyncReducer from './asyncReducer';

const rootReducer = combineReducers({
  count,
  asyncReducer,
  routing: routerReducer
});

export default rootReducer;