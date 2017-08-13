import * as APIUtil from '../util/api_util';

// REDUCER CONSTANTS -----------------------------

export const RECEIVE_TOP_CHARACTERS = 'RECEIVE_TOP_CHARACTERS';
export const RECEIVE_TOP_CHARACTERS_ERRORS = 'RECEIVE_TOP_CHARACTERS_ERRORS';
export const RECEIVE_TOP_EPISODES = 'RECEIVE_TOP_EPISODES';
export const RECEIVE_TOP_EPISODES_ERRORS = 'RECEIVE_TOP_EPISODES_ERRORS';



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

// ASYNC ACTION CREATORS -----------------------------

export const fetchTopCharacters = () => (dispatch) => {
  return APIUtil.fetchTopCharacters()
    .then(
      (resp) => dispatch(receiveTopCharacters(resp)),
      (errors) => dispatch(receiveTopCharactersErrors(errors.responseJSON)));
};

export const fetchTopEpisodes = () => (dispatch) => {
  return APIUtil.fetchTopEpisodes()
    .then(
      (resp) => dispatch(receiveTopEpisodes(resp)),
      (errors) => dispatch(receiveTopEpisodesErrors(errors.responseJSON)));
};
