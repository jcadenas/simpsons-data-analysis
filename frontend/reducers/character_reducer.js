import {
RECEIVE_NAV_CHARACTERS,
RECEIVE_SCRIPT_LINE
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

    case RECEIVE_SCRIPT_LINE: {
      newState = merge({}, state, {entities: { [action.script_line.character_id]: { random_script_line: action.script_line.random_script_line } }});
      return newState;
    }

    default:
      return state;
  }
};

export default ChartacterReducer;
