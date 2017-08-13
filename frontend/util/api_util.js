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
