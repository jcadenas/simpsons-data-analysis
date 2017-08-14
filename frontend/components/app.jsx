import React from 'react';
import { Route } from 'react-router-dom';
import TopCharacters from './landing/top_characters';
import TopEpisodes from './landing/top_episodes';
import TopSeasons from './landing/top_seasons';
import TopLocations from './landing/top_locations';
import SeasonsByIMDBRating from './landing/seasons_by_imdb_rating';


const App = () => {
  return (
    <header>
      <h2>Hi-dilly ho-dilly, neighbor-inho!</h2>
      <TopCharacters />
      <TopEpisodes />
      <TopSeasons />
      <TopLocations />
      <SeasonsByIMDBRating />
    </header>
  );
};

export default App;
