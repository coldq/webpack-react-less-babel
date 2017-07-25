import {Count_DEC,Count_INC} from '../constants';
import initialState from './initialState';

export default function counter(state = initialState.count, action) {
  switch (action.type) {
    case Count_INC:
      return state + 1;
    case Count_DEC:
      return state - 1;
    default:
      return state;
  }
}
