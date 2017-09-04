import React from 'react';
import { fetchNavCharacters } from '../../actions/navigation_actions';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CharacterNavigationItem from './character_navigation_item';
import { characterNavToArray } from '../../selectors/character_nav_selector';


class CharacterNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.navElements = {};
  }

  componentDidMount(){
    this.props.fetchNavCharacters();
  }

  // <h2 className="character-nav-header">characters</h2>
  render(){
    if (this.props.characters.length) {
      const characters = this.props.characters.map((character, idx) => {
        return (
          <div>
            <NavLink
              to={`/characters/${character.character_id}`}
              key={idx}
              activeClassName="character-nav-active"
              className="character-nav-item">
              <CharacterNavigationItem character={character} />
            </NavLink>
            <div ref={el => this.navElements[idx] = el></div>
          </div>
        );
      });
      return(
        <section className="character-nav-container">
          <nav className="character-nav">
            <div className="angle-container">
              <i className="fa fa-angle-left fa-angle" aria-hidden="true"></i>
            </div>
            <ul className="character-nav-list">
              {characters}
            </ul>
            <div className="angleContainer">
              <i className="fa fa-angle-right fa-angle" aria-hidden="true"></i>
            </div>
          </nav>
        </section>
      );
    } else {
      return (
        <nav className="character-nav">
          <span>Loading...</span>
        </nav>
      )
    }
  }
};

const mapStateToProps = (state) => {
  return ({
    characters: characterNavToArray(state.characters.entities)
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchNavCharacters: () => dispatch(fetchNavCharacters())
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterNavigation));
