// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import currentPage from './pageReducer';
 import blog from './blogReducer';
 import articleReducer from './articleReducer';

const rootReducer = combineReducers({
  currentPage,
  article:articleReducer,
  blog,
  routing: routerReducer
});

export default rootReducer;