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
    super(props);
    this.characterImg = this.characterImg.bind(this);
    this.handleScriptLineFetch = this.handleScriptLineFetch.bind(this);
    this.displayScriptLine = this.displayScriptLine.bind(this);
    this.removeCharacterLoader = this.removeCharacterLoader.bind(this);
    this.state = {
      scriptLine: "",
      characterLoading: true
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
    fetchScriptLine(this.props.match.params.characterId).then((resp) => this.setState({scriptLine: `"${resp['random_script_line']}"`}));
    $('.character-image').addClass('hidden');
  }

  componentWillReceiveProps (newProps) {
    if (this.props.match.params.characterId !== newProps.match.params.characterId) {
      // this.props.fetchScriptLine(newProps.match.params.characterId);
      $('.character-image').addClass('hidden');
      this.setState({
        scriptLine: "",
        characterLoading: true
      });
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
    this.setState({scriptLine: ""});
    ga('send', 'event', 'scriptLineGenerator', 'scriptLineRefresh', this.props.currentCharacter.normalized_name);
    fetchScriptLine(this.props.match.params.characterId).then((resp) => this.setState({scriptLine: `"${resp['random_script_line']}"`}));
  }

  removeCharacterLoader() {
    this.setState({characterLoading: false});
    $('.character-image').removeClass('hidden');

  }

  characterImg() {
    if (window.images['char_'+this.props.match.params.characterId]){
      return (
        <img
        src={ window.images['char_'+this.props.match.params.characterId] }
        className="character-image char-img"
        onLoad={this.removeCharacterLoader}/>
    )
    } else {
      return <img src={ window.images.unknown } className="character-unknown char-img" />
    };
  }

  displayCharacterLoader() {
    if (this.state.characterLoading === true) {
      return (
        <div className="loader-circle-container">
          <div className="loader-circle">Loading...</div>
        </div>
      );
    } else {
      return null;
    }
  }

  displayScriptLine() {
    if (this.state.scriptLine.length > 0) {
      return (
        <p className="script-line">
          {this.state.scriptLine}
        </p>
      );
    } else {
      return (
        <div className="loader-elipsis-container">
          <div className="loader-elipsis">Loading...</div>
        </div>
      )
    }
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
                {this.displayCharacterLoader()}
                {this.characterImg()}
              </div>
              <div className="script-line-container"
                onClick={this.handleScriptLineFetch}>
                <div className="refresh-icon-container">
                  <img
                    src={ window.icons.refresh }
                    className="refresh-icon"
                    />
                </div>
                {this.displayScriptLine()}
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





export default connect(mapStateToProps, null)(CharacterView);
