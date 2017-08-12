import * as APIUtil from '../util/api_util';

// REDUCER CONSTANTS -----------------------------

export const RECEIVE_TOP_CHARACTERS = 'RECEIVE_TOP_CHARACTERS';
export const RECEIVE_TOP_CHARACTERS_ERRORS = 'RECEIVE_TOP_CHARACTERS_ERRORS';



// OBJECT ACTION CREATORS -----------------------------

export const receiveTopCharacters = (top_characters) => {
  return ({
    type: RECEIVE_TOP_CHARACTERS,
    top_characters
  });
};

export const receiveTopCharactersErrors = (errors) => {
  return ({
    type: RECEIVE_MESSAGE_ERRORS,
    errors
  });
};

// ASYNC ACTION CREATORS -----------------------------

export const fetchTopCharacters = () => (dispatch) => {
  // debugger;
  return APIUtil.fetchTopCharacters()
    .then(
      (resp) => dispatch(receiveTopCharacters(resp)),
      (errors) => dispatch(receiveTopCharactersErrors(errors.responseJSON)));
};
