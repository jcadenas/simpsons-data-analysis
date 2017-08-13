import {
  RECEIVE_TOP_CHARACTERS,
  RECEIVE_TOP_EPISODES
} from '../actions/chart_actions';
import { merge } from 'lodash';

const defaultState = {
  entities: {},
  errors: []
};


const ChartReducer = (state = defaultState, action) => {
  let newState;
  // debugger;
  switch(action.type){

    case RECEIVE_TOP_CHARACTERS: {
      newState = merge({}, state, {entities: { ['top_characters']: action.top_characters}});
      return newState;
    }

    case RECEIVE_TOP_EPISODES: {
      newState = merge({}, state, {entities: { ['top_episodes']: action.top_episodes}});
      return newState;
    }

    default:
      return state;
  }
};

export default ChartReducer;
