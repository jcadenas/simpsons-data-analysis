import React from 'react';
import { connect } from 'react-redux';
import MostInvolvedEpisodes from './most_involved_episodes';

class CharacterView extends React.Component {


  render() {
    debugger
    return(
      <section>
        <h2>Character View</h2>
        <MostInvolvedEpisodes characterId={this.props.match.params.characterId}/>
      </section>
    )
  }

}

export default CharacterView;
