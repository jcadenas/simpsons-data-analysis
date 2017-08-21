import {
RECEIVE_NAV_CHARACTERS
} from '../actions/navigation_actions';
import { merge } from 'lodash';

const defaultState = {
  entities: {},
  errors: []
};


const ChartacterReducer = (state = defaultState, action) => {
  let newState;
  switch(action.type){

    case RECEIVE_NAV_CHARACTERS: {
      newState = merge({}, state, {entities: action.characters});
      return newState;
    }

    default:
      return state;
  }
};

export default ChartacterReducer;
