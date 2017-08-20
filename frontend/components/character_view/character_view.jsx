import React from 'react';
import { connect } from 'react-redux';
import MostInvolvedEpisodes from './most_involved_episodes';
import TopLocations from './top_locations';
import AvgEpInvolvementBySeason from './avg_ep_involvement_by_season';
import SeasonalInvolvement from './seasonal_involvement';

class CharacterView extends React.Component {


  render() {
    return(
      <section>
        <h2>Character View</h2>
        <MostInvolvedEpisodes characterId={this.props.match.params.characterId}/>
        <TopLocations characterId={this.props.match.params.characterId}/>
        <AvgEpInvolvementBySeason characterId={this.props.match.params.characterId}/>
        <SeasonalInvolvement characterId={this.props.match.params.characterId}/>
      </section>
    )
  }

}

export default CharacterView;
