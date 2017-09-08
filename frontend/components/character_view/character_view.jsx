import React from 'react';
import { connect } from 'react-redux';
import MostInvolvedEpisodes from './most_involved_episodes';
import TopLocations from './top_locations';
import AvgEpInvolvementBySeason from './avg_ep_involvement_by_season';
import SeasonalInvolvement from './seasonal_involvement';
import TopEpisodes from './top_episodes';
import ChartTabs from '../chart_tabs';
import { fetchScriptLine } from '../../util/api_util';


class CharacterView extends React.Component {

  constructor (props) {
    debugger;
    super(props);
    this.characterImg = this.characterImg.bind(this);
    this.handleScriptLineFetch = this.handleScriptLineFetch.bind(this);
    this.displayScriptLine = this.displayScriptLine.bind(this);
    this.state = {
      scriptLine: ""
    }
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
    debugger;
    fetchScriptLine(this.props.match.params.characterId).then((resp) => this.setState({scriptLine: `"${resp['random_script_line']}"`}));
  }

  componentWillReceiveProps (newProps) {
    debugger;
    if (this.props.match.params.characterId !== newProps.match.params.characterId) {
      // this.props.fetchScriptLine(newProps.match.params.characterId);
      debugger;
      this.setState({scriptLine: ""});
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
      fetchScriptLine(newProps.match.params.characterId).then((resp) => this.setState({scriptLine: `"${resp['random_script_line']}"`}));
    }
  }

  handleScriptLineFetch() {
    debugger;
    this.setState({scriptLine: ""});
    fetchScriptLine(this.props.match.params.characterId).then((resp) => this.setState({scriptLine: `"${resp['random_script_line']}"`}));
  }

  characterImg() {
    debugger;
    if (window.images['char_'+this.props.match.params.characterId]){
      debugger;
      return <img src={ window.images['char_'+this.props.match.params.characterId] } className="character-image char-img" />
    } else {
      debugger;
      return <img src={ window.images.unknown } className="character-unknown char-img" />
    };
  }

  displayScriptLine() {
    debugger;
    if (this.state.scriptLine.length > 0) {
      debugger;
      return this.state.scriptLine
    } else {
      debugger;
      return (
        <span>...</span>
      )
    }
  }

  render() {
    debugger;
    if (this.props.currentCharacter){
      debugger;
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
                <div className="refresh-icon-container"
                  onClick={this.handleScriptLineFetch}>
                  <img
                    src={ window.icons.refresh }
                    className="refresh-icon"
                    />
                </div>
                <p className="script-line">
                  {this.displayScriptLine()}
                </p>
              </div>
            </div>
          </section>
            <ChartTabs charts={this.CHARTS} />
        </section>
      )
    } else {
      debugger;
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
  debugger;
  return ({
    characters: state.characters,
    currentCharacter: state.characters.entities[ownProps.match.params.characterId]
  })
}





export default connect(mapStateToProps, null)(CharacterView);
