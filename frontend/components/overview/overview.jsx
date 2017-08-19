import React from 'react';
import TopCharacters from './top_characters';
import TopEpisodes from './top_episodes';
import TopSeasons from './top_seasons';
import TopLocations from './top_locations';
import SeasonsByIMDBRating from './seasons_by_imdb_rating';

class Overview extends React.Component {


  render() {
    return(
      <section>
        <TopCharacters />
        <TopEpisodes />
        <TopSeasons />
        <TopLocations />
        <SeasonsByIMDBRating />
      </section>
    )
  }

}

export default Overview;
