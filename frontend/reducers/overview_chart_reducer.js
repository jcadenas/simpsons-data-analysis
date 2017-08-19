import {
  RECEIVE_TOP_CHARACTERS,
  RECEIVE_TOP_EPISODES,
  RECEIVE_TOP_SEASONS,
  RECEIVE_TOP_LOCATIONS,
  RECEIVE_SEASONS_BY_IMDB_RATING
} from '../actions/chart_actions';
import { merge } from 'lodash';

const defaultState = {
  entities: {},
  errors: []
};


const OverviewChartReducer = (state = defaultState, action) => {
  let newState;
  switch(action.type){

    case RECEIVE_TOP_CHARACTERS: {
      newState = merge({}, state, {entities: { ['top_characters']: action.top_characters}});
      return newState;
    }

    case RECEIVE_TOP_EPISODES: {
      newState = merge({}, state, {entities: { ['top_episodes']: action.top_episodes}});
      return newState;
    }

    case RECEIVE_TOP_SEASONS: {
      newState = merge({}, state, {entities: { ['top_seasons']: action.top_seasons}});
      return newState;
    }

    case RECEIVE_TOP_LOCATIONS: {
      newState = merge({}, state, {entities: { ['top_locations']: action.top_locations}});
      return newState;
    }

    case RECEIVE_SEASONS_BY_IMDB_RATING: {
      newState = merge({}, state, {entities: { ['seasons_by_imdb_rating']: action.seasons_by_imdb_rating}});
      return newState;
    }

    default:
      return state;
  }
};

export default OverviewChartReducer;
