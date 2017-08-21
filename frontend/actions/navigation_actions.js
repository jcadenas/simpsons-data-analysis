import * as APIUtil from '../util/api_util';

// REDUCER CONSTANTS -----------------------------

export const RECEIVE_NAV_CHARACTERS = 'RECEIVE_NAV_CHARACTERS';




// OBJECT ACTION CREATORS -----------------------------

export const receiveNavCharacters = (characters) => {
  return ({
    type: RECEIVE_NAV_CHARACTERS,
    characters
  });
};




// ASYNC ACTION CREATORS -----------------------------

export const fetchNavCharacters = () => (dispatch) => {
  return APIUtil.fetchNavCharacters()
    .then(
      (res) => dispatch(receiveNavCharacters(res)));
};
