import {
RECEIVE_MOST_INVOLVED_EPISODES
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
      window.merge = merge;
      newState = Object.assign({}, state, {entities: { ['most_involved_episodes']: action.episodes}});
      return newState;
    }

    default:
      return state;
  }
};

export default ChartacterChartReducer;
