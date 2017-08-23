import React from 'react';
import { connect } from 'react-redux';
import MostInvolvedEpisodes from './most_involved_episodes';
import TopLocations from './top_locations';
import AvgEpInvolvementBySeason from './avg_ep_involvement_by_season';
import SeasonalInvolvement from './seasonal_involvement';
import TopEpisodes from './top_episodes';

class CharacterView extends React.Component {


  render() {
    const characterImg = () => {
      if (window.images['char_'+this.props.match.params.characterId]){
        return <img src={ window.images['char_'+this.props.match.params.characterId] } className="character-image" />
      } else {
        return <img src={ window.images.char_31 } className="character-image" />
      };
    }
    return(
      <section className="content-container" >
        <section className="character-detail" >
          {characterImg()}
          <h2>Character View</h2>
        </section>
        <section className="charts-container" >
          <MostInvolvedEpisodes characterId={this.props.match.params.characterId}/>
          <TopLocations characterId={this.props.match.params.characterId}/>
          <AvgEpInvolvementBySeason characterId={this.props.match.params.characterId}/>
          <SeasonalInvolvement characterId={this.props.match.params.characterId}/>
          <TopEpisodes characterId={this.props.match.params.characterId}/>
        </section>
      </section>
    )
  }

}

export default CharacterView;
