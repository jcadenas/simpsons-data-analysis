import { RECEIVE_TOP_CHARACTERS } from '../actions/chart_actions';
import { merge } from 'lodash';

const defaultState = {
  entities: {},
  errors: []
};


const ChartReducer = (state = defaultState, action) => {
  let newState;
  switch(action.type){

    case RECEIVE_TOP_CHARACTERS: {
      newState = merge({}, state, {entities: { ['top_characters']: action.top_characters}});
      return newState;
    }

    default:
      return state;
  }
};

export default ChartReducer;
