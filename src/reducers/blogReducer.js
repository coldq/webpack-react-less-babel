import initialState from './initialState';

import {
  LOAD_BLOG_SUCCESS,
  LOAD_BLOG,
  LOAD_BLOG_ERROR,
} from '../constants';

// The initial state of the App
// const initialState = fromJS({
//   loading: false,
//   error: false,
//   currentUser: false,
//   userData: {
//     repositories: false,
//   },
// });

function blogReducer(state = initialState.blog, action) {
  switch (action.type) {
    case LOAD_BLOG:
      // return Object.assign({}, state, {
      //     loadding:true,
      //     data:{sum:false,bloglist:false}
      //   });

      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['data', 'sum'], false)
        .setIn(['data', 'bloglist'], false);
    case LOAD_BLOG_SUCCESS:
      return state
        .setIn(['data', 'sum'], action.sum)
        .setIn(['data', 'bloglist'], action.blogs)
        .set('loading', false);
    case LOAD_BLOG_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default blogReducer;