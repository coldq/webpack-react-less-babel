import {PAGE_CHANGE} from '../constants';
import initialState from './initialState';

export default function counter(state = initialState.currentPage, action) {
  switch (action.type) {
    case PAGE_CHANGE:
      return action.pageNum;
    default:
      return state;
  }
}
