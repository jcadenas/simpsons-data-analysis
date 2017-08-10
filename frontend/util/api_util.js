// CHARTS API ----------------------------------------

export const fetchTopCharacters = () => {
  return $.ajax({
    url: '/api/charts/top_characters'
  });
};
