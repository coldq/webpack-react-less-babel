import request from '../utils/request';
import {
    GET_ARTICLE_SUCCESS,
    GET_ARTICLE_ERROR
} from '../constants';


export function getArticle(filename) {
   return async(dispatch) => { //getState
     try{
        let data =await request(`http://localhost:3008/getArticle/${filename}`)
        dispatch(articleLoaded(data.data));
     }catch(error){
        dispatch(articleLoadingError(error));
     }
   };
}

function articleLoaded(article) {
  return {
    type: GET_ARTICLE_SUCCESS,
    article,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
function articleLoadingError(error) {
  return {
    type: GET_ARTICLE_ERROR,
    error,
  };
}