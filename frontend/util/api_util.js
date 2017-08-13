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
