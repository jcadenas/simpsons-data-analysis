import React from 'react';
import { connect } from 'react-redux';
import MostInvolvedEpisodes from './most_involved_episodes';
import TopLocations from './top_locations';
import AvgEpInvolvementBySeason from './avg_ep_involvement_by_season';
import SeasonalInvolvement from './seasonal_involvement';
import TopEpisodes from './top_episodes';
import ChartTabs from './chart_tabs';

const CHARTS = [
  {
    title: "Most Involved Eps",
    chart: <MostInvolvedEpisodes />
  },
  {
    title: "Top Locations",
    chart: <TopLocations />
  },
  {
    title: "Avg Ep Involvement By Season",
    chart: <AvgEpInvolvementBySeason />
  },
  {
    title: "Seasonal Involvement",
    chart: <SeasonalInvolvement />
  },
  {
    title: "Top Episodes",
    chart: <TopEpisodes />
  }
]

class CharacterView extends React.Component {

  constructor (props) {
    super(props);
    this.characterImg = this.characterImg.bind(this);
  }

  characterImg() {
    if (window.images['char_'+this.props.match.params.characterId]){
      return <img src={ window.images['char_'+this.props.match.params.characterId] } className="character-image" />
    } else {
      return <img src={ window.images.unknown } className="character-unknown" />
    };
  }


  render() {
    return(
      <section className="content-container" >
        <section className="character-detail" >
          {this.characterImg()}
          <h2>Character View</h2>
        </section>
        <section className="charts-container" >
          <ChartTabs charts={CHARTS} />
        </section>
      </section>
    )
  }

}

const mapStateToProps = (state) => {
  return ({
    characters: state.characters
  })
}




export default connect(mapStateToProps, null)(CharacterView);
