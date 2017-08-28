import * as APIUtil from '../util/api_util';

// REDUCER CONSTANTS -----------------------------

export const RECEIVE_NAV_CHARACTERS = 'RECEIVE_NAV_CHARACTERS';
export const RECEIVE_SCRIPT_LINE = 'RECEIVE_SCRIPT_LINE';




// OBJECT ACTION CREATORS -----------------------------

export const receiveNavCharacters = (characters) => {
  return ({
    type: RECEIVE_NAV_CHARACTERS,
    characters
  });
};

export const receiveScriptLine = (script_line) => {
  return ({
    type: RECEIVE_SCRIPT_LINE,
    script_line
  });
};




// ASYNC ACTION CREATORS -----------------------------

export const fetchNavCharacters = () => (dispatch) => {
  return APIUtil.fetchNavCharacters()
    .then(
      (res) => dispatch(receiveNavCharacters(res)));
};

export const fetchScriptLine = (character_id) => (dispatch) => {
  return APIUtil.fetchScriptLine(character_id)
    .then(
      (res) => dispatch(receiveScriptLine(res)));
};
