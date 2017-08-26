import React from 'react';
import { connect } from 'react-redux';
import MostInvolvedEpisodes from './most_involved_episodes';
import TopLocations from './top_locations';
import AvgEpInvolvementBySeason from './avg_ep_involvement_by_season';
import SeasonalInvolvement from './seasonal_involvement';
import TopEpisodes from './top_episodes';
import ChartTabs from './chart_tabs';


class CharacterView extends React.Component {

  constructor (props) {
    super(props);
    this.characterImg = this.characterImg.bind(this);
    this.CHARTS = [
      {
        title: "Most Involved Eps",
        chart: <MostInvolvedEpisodes characterId={this.props.match.params.characterId} />
      },
      {
        title: "Top Locations",
        chart: <TopLocations characterId={this.props.match.params.characterId} />
      },
      {
        title: "Avg Ep Involvement By Season",
        chart: <AvgEpInvolvementBySeason characterId={this.props.match.params.characterId} />
      },
      {
        title: "Seasonal Involvement",
        chart: <SeasonalInvolvement characterId={this.props.match.params.characterId} />
      },
      {
        title: "Top Episodes",
        chart: <TopEpisodes characterId={this.props.match.params.characterId} />
      }
    ];
  }


  componentWillReceiveProps (newProps) {
    debugger;
    if (this.props.match.params.characterId !== newProps.match.params.characterId) {
      this.CHARTS = [
        {
          title: "Most Involved Eps",
          chart: <MostInvolvedEpisodes characterId={newProps.match.params.characterId} />
        },
        {
          title: "Top Locations",
          chart: <TopLocations characterId={newProps.match.params.characterId} />
        },
        {
          title: "Avg Ep Involvement By Season",
          chart: <AvgEpInvolvementBySeason characterId={newProps.match.params.characterId} />
        },
        {
          title: "Seasonal Involvement",
          chart: <SeasonalInvolvement characterId={newProps.match.params.characterId} />
        },
        {
          title: "Top Episodes",
          chart: <TopEpisodes characterId={newProps.match.params.characterId} />
        }
      ];
    }
  }

  characterImg() {
    if (window.images['char_'+this.props.match.params.characterId]){
      return <img src={ window.images['char_'+this.props.match.params.characterId] } className="character-image" />
    } else {
      return <img src={ window.images.unknown } className="character-unknown" />
    };
  }


  render() {
    debugger;
    return(
      <section className="content-container" >
        <section className="character-detail" >
          {this.characterImg()}
          <h2>Character View</h2>
        </section>
        <section className="charts-container" >
          <ChartTabs charts={this.CHARTS} />
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
