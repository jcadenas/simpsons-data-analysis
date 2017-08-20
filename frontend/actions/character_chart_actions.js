import * as APIUtil from '../util/api_util';

// REDUCER CONSTANTS -----------------------------

export const RECEIVE_MOST_INVOLVED_EPISODES = 'RECEIVE_MOST_INVOLVED_EPISODES';
export const RECEIVE_CHARACTER_TOP_LOCATIONS = 'RECEIVE_CHARACTER_TOP_LOCATIONS';
export const RECEIVE_AVG_EP_INVOLVEMENT_BY_SEASON = 'RECEIVE_AVG_EP_INVOLVEMENT_BY_SEASON';
export const RECEIVE_SEASON_INVOLVEMENT = 'RECEIVE_SEASON_INVOLVEMENT';
export const RECEIVE_CHARACTER_TOP_EPISODES = 'RECEIVE_CHARACTER_TOP_EPISODES';




// OBJECT ACTION CREATORS -----------------------------

export const receiveMostInvolvedEpisodes = (episodes) => {
  return ({
    type: RECEIVE_MOST_INVOLVED_EPISODES,
    episodes
  });
};

export const receiveCharacterTopLocations = (locations) => {
  return ({
    type: RECEIVE_CHARACTER_TOP_LOCATIONS,
    locations
  });
};

export const receiveAvgEpInvolvementBySeason = (seasons) => {
  return ({
    type: RECEIVE_AVG_EP_INVOLVEMENT_BY_SEASON,
    seasons
  });
};

export const receiveSeasonalInvolvement = (seasons) => {
  return ({
    type: RECEIVE_SEASON_INVOLVEMENT,
    seasons
  });
};

export const receiveCharacterTopEpisodes = (episodes) => {
  return ({
    type: RECEIVE_CHARACTER_TOP_EPISODES,
    episodes
  });
};


// ASYNC ACTION CREATORS -----------------------------

export const fetchMostInvolvedEpisodes = (characterId) => (dispatch) => {
  return APIUtil.fetchMostInvolvedEpisodes(characterId)
    .then(
      (res) => dispatch(receiveMostInvolvedEpisodes(res)));
};

export const fetchCharacterTopLocations = (characterId) => (dispatch) => {
  return APIUtil.fetchCharacterTopLocations(characterId)
    .then(
      (res) => dispatch(receiveCharacterTopLocations(res)));
};

export const fetchAvgEpInvolvementBySeason = (characterId) => (dispatch) => {
  return APIUtil.fetchAvgEpInvolvementBySeason(characterId)
    .then(
      (res) => dispatch(receiveAvgEpInvolvementBySeason(res)));
};

export const fetchSeasonalInvolvement = (characterId) => (dispatch) => {
  return APIUtil.fetchSeasonalInvolvement(characterId)
    .then(
      (res) => dispatch(receiveSeasonalInvolvement(res)));
};

export const fetchCharacterTopEpisodes = (characterId) => (dispatch) => {
  return APIUtil.fetchCharacterTopEpisodes(characterId)
    .then(
      (res) => dispatch(receiveCharacterTopEpisodes(res)));
};
