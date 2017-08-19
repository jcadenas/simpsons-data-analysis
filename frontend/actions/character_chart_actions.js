import * as APIUtil from '../util/api_util';

// REDUCER CONSTANTS -----------------------------

export const RECEIVE_MOST_INVOLVED_EPISODES = 'RECEIVE_MOST_INVOLVED_EPISODES';




// OBJECT ACTION CREATORS -----------------------------

export const receiveMostInvolvedEpisodes = (episodes) => {
  return ({
    type: RECEIVE_MOST_INVOLVED_EPISODES,
    episodes
  });
};


// ASYNC ACTION CREATORS -----------------------------

export const fetchMostInvolvedEpisodes = (characterId) => (dispatch) => {
  return APIUtil.fetchMostInvolvedEpisodes(characterId)
    .then(
      (res) => dispatch(receiveMostInvolvedEpisodes(res)));
};
