import initialState from './initialState';

import {
  GET_ARTICLE_ERROR,
  GET_ARTICLE_SUCCESS
} from '../constants';

function articleReducer(state = initialState.article, action) {
  switch (action.type) {
    case GET_ARTICLE_SUCCESS:
      return action.article;
    case GET_ARTICLE_ERROR:
      return action.error;
    default:
      return state;
  }
}

export default articleReducer;