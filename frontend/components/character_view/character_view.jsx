import React from 'react';
import { connect } from 'react-redux';
import MostInvolvedEpisodes from './most_involved_episodes';
import TopLocations from './top_locations';
import AvgEpInvolvementBySeason from './avg_ep_involvement_by_season';
import SeasonalInvolvement from './seasonal_involvement';
import TopEpisodes from './top_episodes';
import ChartTabs from '../chart_tabs';
import { fetchScriptLine } from '../../actions/navigation_actions';


class CharacterView extends React.Component {

  constructor (props) {
    super(props);
    this.characterImg = this.characterImg.bind(this);
    this.handleScriptLineFetch = this.handleScriptLineFetch.bind(this);
    this.CHARTS = [
      {
        title: "Most Involved Episodes",
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

  componentDidMount() {
    this.props.fetchScriptLine(this.props.match.params.characterId);
  }

  componentWillReceiveProps (newProps) {
    if (this.props.match.params.characterId !== newProps.match.params.characterId) {
      this.props.fetchScriptLine(newProps.match.params.characterId);
      this.CHARTS = [
        {
          title: "Most Involved Episodes",
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

  handleScriptLineFetch() {
    this.props.fetchScriptLine(this.props.match.params.characterId);
  }

  characterImg() {
    if (window.images['char_'+this.props.match.params.characterId]){
      return <img src={ window.images['char_'+this.props.match.params.characterId] } className="character-image char-img" />
    } else {
      return <img src={ window.images.unknown } className="character-unknown char-img" />
    };
  }


  render() {
    if (this.props.currentCharacter){
      return(
        <section className="content-container" >
          <section className="character-detail" >
            <div className="character-name-header-container">
              <h2 className="character-name-header">
                {this.props.currentCharacter.normalized_name}
              </h2>
            </div>
            <div className="character-image-script-line">
              <div className="image-container">
                {this.characterImg()}
              </div>
              <div className="script-line-container">
                <img
                  src={ window.icons.refresh }
                  className="refresh-icon"
                  />
                <p onClick={this.handleScriptLineFetch} className="script-line">
                  "{this.props.currentCharacter.random_script_line}"
                </p>
              </div>
            </div>
          </section>
            <ChartTabs charts={this.CHARTS} />
        </section>
      )
    } else {
      return (
        <section className="content-container" >
          <section className="character-detail" >
            <h2>Loading...</h2>
            {this.characterImg()}
          </section>
          <section className="charts-container" >
            <ChartTabs charts={this.CHARTS} />
          </section>
        </section>
      )
    }
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




export default connect(mapStateToProps, mapDispatchToProps)(CharacterView);
