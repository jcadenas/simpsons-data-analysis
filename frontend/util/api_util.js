// CHARTS API ----------------------------------------

export const fetchTopCharacters = () => {
  return $.ajax({
    url: '/api/charts/top_characters'
  });
};

export const fetchTopEpisodes = () => {
  return $.ajax({
    url: '/api/charts/top_episodes'
  });
};

export const fetchTopSeasons = () => {
  return $.ajax({
    url: '/api/charts/top_seasons'
  });
};

export const fetchTopLocations = () => {
  return $.ajax({
    url: '/api/charts/top_locations'
  });
};

export const fetchSeasonsByIMDBRating = () => {
  return $.ajax({
    url: '/api/charts/seasons_by_imdb_rating'
  });
};

export const fetchMostInvolvedEpisodes = (characterId) => {
  return $.ajax({
    url: `/api/character_charts/most_involved_episodes/${characterId}`
  });
};

export const fetchCharacterTopLocations = (characterId) => {
  return $.ajax({
    url: `/api/character_charts/top_locations/${characterId}`
  });
};

export const fetchAvgEpInvolvementBySeason = (characterId) => {
  return $.ajax({
    url: `/api/character_charts/avg_ep_involvement_by_season/${characterId}`
  });
};

export const fetchSeasonalInvolvement = (characterId) => {
  return $.ajax({
    url: `/api/character_charts/seasonal_involvement/${characterId}`
  });
};

export const fetchCharacterTopEpisodes = (characterId) => {
  return $.ajax({
    url: `/api/character_charts/top_episodes/${characterId}`
  });
};

export const fetchNavCharacters = () => {
  return $.ajax({
    url: `/api/characters/nav_characters`
  });
};

export const fetchScriptLine = (character_id) => {
  return $.ajax({
    url: `/api/characters/script_line/${character_id}`
  });
};













// Bottom of file
