import {
  RECEIVE_MOST_INVOLVED_EPISODES,
  RECEIVE_CHARACTER_TOP_LOCATIONS,
  RECEIVE_AVG_EP_INVOLVEMENT_BY_SEASON,
  RECEIVE_SEASON_INVOLVEMENT,
  RECEIVE_CHARACTER_TOP_EPISODES
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

    case RECEIVE_AVG_EP_INVOLVEMENT_BY_SEASON: {
      newState = Object.assign({}, state);
      newState.entities['avg_ep_involvement_by_season'] = action.seasons;
      return newState;
    }

    case RECEIVE_SEASON_INVOLVEMENT: {
      newState = Object.assign({}, state);
      newState.entities['seasonal_involvement'] = action.seasons;
      return newState;
    }

    case RECEIVE_CHARACTER_TOP_EPISODES: {
      newState = Object.assign({}, state);
      newState.entities['top_episodes'] = action.episodes;
      return newState;
    }

    default:
      return state;
  }
};

export default ChartacterChartReducer;
