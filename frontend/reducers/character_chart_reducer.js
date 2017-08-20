import {
RECEIVE_MOST_INVOLVED_EPISODES,
RECEIVE_CHARACTER_TOP_LOCATIONS
} from '../actions/character_chart_actions';
import { merge } from 'lodash';

const defaultState = {
  entities: {},
  errors: []
};


const ChartacterChartReducer = (state = defaultState, action) => {
  let newState;
  switch(action.type){

    case RECEIVE_MOST_INVOLVED_EPISODES: {
      newState = Object.assign({}, state);
      newState.entities['most_involved_episodes'] = action.episodes;
      return newState;
    }

    case RECEIVE_CHARACTER_TOP_LOCATIONS: {
      newState = Object.assign({}, state);
      newState.entities['top_locations'] = action.locations;
      return newState;
    }

    default:
      return state;
  }
};

export default ChartacterChartReducer;
