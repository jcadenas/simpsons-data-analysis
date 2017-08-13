import * as APIUtil from '../util/api_util';

// REDUCER CONSTANTS -----------------------------

export const RECEIVE_TOP_CHARACTERS = 'RECEIVE_TOP_CHARACTERS';
export const RECEIVE_TOP_CHARACTERS_ERRORS = 'RECEIVE_TOP_CHARACTERS_ERRORS';
export const RECEIVE_TOP_EPISODES = 'RECEIVE_TOP_EPISODES';
export const RECEIVE_TOP_EPISODES_ERRORS = 'RECEIVE_TOP_EPISODES_ERRORS';
export const RECEIVE_TOP_SEASONS = 'RECEIVE_TOP_SEASONS';
export const RECEIVE_TOP_SEASONS_ERRORS = 'RECEIVE_TOP_SEASONS_ERRORS';
export const RECEIVE_TOP_LOCATIONS = 'RECEIVE_TOP_LOCATIONS';
export const RECEIVE_TOP_LOCATIONS_ERRORS = 'RECEIVE_TOP_LOCATIONS_ERRORS';



// OBJECT ACTION CREATORS -----------------------------

export const receiveTopCharacters = (top_characters) => {
  return ({
    type: RECEIVE_TOP_CHARACTERS,
    top_characters
  });
};

export const receiveTopCharactersErrors = (errors) => {
  return ({
    type: RECEIVE_TOP_CHARACTERS_ERRORS,
    errors
  });
};

export const receiveTopEpisodes = (top_episodes) => {
  return ({
    type: RECEIVE_TOP_EPISODES,
    top_episodes
  });
};

export const receiveTopEpisodesErrors = (errors) => {
  return ({
    type: RECEIVE_TOP_EPISODES_ERRORS,
    errors
  });
};

export const receiveTopSeasons = (top_seasons) => {
  return ({
    type: RECEIVE_TOP_SEASONS,
    top_seasons
  });
};

export const receiveTopSeasonsErrors = (errors) => {
  return ({
    type: RECEIVE_TOP_SEASONS_ERRORS,
    errors
  });
};

export const receiveTopLocations = (top_locations) => {
  return ({
    type: RECEIVE_TOP_LOCATIONS,
    top_locations
  });
};

export const receiveTopLocationsErrors = (errors) => {
  return ({
    type: RECEIVE_TOP_LOCATIONS_ERRORS,
    errors
  });
};

// ASYNC ACTION CREATORS -----------------------------

export const fetchTopCharacters = () => (dispatch) => {
  return APIUtil.fetchTopCharacters()
    .then(
      (res) => dispatch(receiveTopCharacters(res)),
      (errors) => dispatch(receiveTopCharactersErrors(errors.responseJSON)));
};

export const fetchTopEpisodes = () => (dispatch) => {
  return APIUtil.fetchTopEpisodes()
    .then(
      (res) => dispatch(receiveTopEpisodes(res)),
      (errors) => dispatch(receiveTopEpisodesErrors(errors.responseJSON)));
};

export const fetchTopSeasons = () => (dispatch) => {
  return APIUtil.fetchTopSeasons()
    .then(
      (res) => dispatch(receiveTopSeasons(res)),
      (errors) => dispatch(receiveTopSeasonsErrors(errors.responseJSON)));
};

export const fetchTopLocations = () => (dispatch) => {
  return APIUtil.fetchTopLocations()
    .then(
      (res) => dispatch(receiveTopLocations(res)),
      (errors) => dispatch(receiveTopLocationsErrors(errors.responseJSON)));
};
