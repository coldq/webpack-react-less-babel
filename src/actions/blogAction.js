/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import request from '../utils/request';
import {
  LOAD_BLOG_SUCCESS,
  LOAD_BLOG,
  LOAD_BLOG_ERROR,
  PAGE_CHANGE
} from '../constants';


export function loadBlogs(currentPage,type) {
   return async(dispatch) => { //getState
     try{
        dispatch(BeforeLoadRepos());
          if(type !== void 0){
            await request(`http://localhost:3008/getBlogsByType/${currentPage-1}/${type}`);
          }
          else await request(`http://localhost:3008/getBlogs/${currentPage-1}`)
                    .then(res => {
                      dispatch(reposLoaded(res,'coldq'));
                    });
     }catch(error){
        dispatch(repoLoadingError(error));
     }
   };
}
export function changePage(pageNum){
  return {
    type: PAGE_CHANGE,
    pageNum
  };

}  
/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function BeforeLoadRepos(){
  return {
      type: LOAD_BLOG,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {object} data  The blogs data
 * @param  {string} sum The blogs summary
 *
 * @return {object}      An action object with a type of LOAD_BLOG_SUCCESS passing the repos
 */
export function reposLoaded(data) {
  let sum = data.sum, blogs = data.blogs;
  return {
    type: LOAD_BLOG_SUCCESS,
    sum,
    blogs,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_BLOG_ERROR,
    error,
  };
}