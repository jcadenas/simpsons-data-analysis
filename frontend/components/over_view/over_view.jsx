import React from 'react';
import { connect } from 'react-redux';
import TopCharacters from './top_characters';
import TopEpisodes from './top_episodes';
import TopSeasons from './top_seasons';
import TopLocations from './top_locations';
import SeasonsByIMDBRating from './seasons_by_imdb_rating';
import ChartTabs from '../chart_tabs';
import { fetchScriptLine } from '../../actions/navigation_actions';


class OverView extends React.Component {

  constructor (props) {
    super(props);
    this.CHARTS = [
      {
        title: "Top Characters",
        chart: <TopCharacters />
      },
      {
        title: "Top Episodes",
        chart: <TopEpisodes />
      },
      {
        title: "Top Seasons",
        chart: <TopSeasons />
      },
      {
        title: "Top Locations",
        chart: <TopLocations />
      },
      {
        title: "Seasons by IMDB Rating",
        chart: <SeasonsByIMDBRating />
      }
    ];
  }


  render() {
      return(
        <section className="content-container" >
          <section className="character-detail" >
            <div className="character-name-header-container">
              <h2 className="character-name-header">
                the simpsons
              </h2>
            </div>
            <div className="character-image-script-line-overview">
              <div className="image-container-overview">
                <img src={ window.images.simpsons_characters } className="simpsons-characters-img char-img" />
              </div>
            </div>
          </section>
            <ChartTabs charts={this.CHARTS} />
        </section>
      )
  }

}

const mapStateToProps = (state, ownProps) => {
  return ({
    characters: state.characters,
    currentCharacter: state.characters.entities[ownProps.match.params.characterId]
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchScriptLine: (character_id) => dispatch(fetchScriptLine(character_id))
  })
}




export default connect(mapStateToProps, mapDispatchToProps)(OverView);
