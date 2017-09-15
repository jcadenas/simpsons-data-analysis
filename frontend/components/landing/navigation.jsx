import React from 'react';
import { fetchNavCharacters } from '../../actions/navigation_actions';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CharacterNavigationItem from './character_navigation_item';
import { characterNavToOrderedArray } from '../../selectors/character_nav_selector';


class CharacterNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.handleNavShift = this.handleNavShift.bind(this);
  }

  componentDidMount(){
    this.props.fetchNavCharacters();
  }

  handleNavShift(direction) {
    return () => {
      const sLeft = this.navListElement.scrollLeft;
      const magnitude = 110;
      const delta = direction == "left" ? -1 * magnitude : magnitude;
      this.navListElement.scrollLeft = sLeft + delta;
    }
  }

  navGaEvent(character_name){
    ga('send', 'event', 'characterNavigation', 'characterSelected', character_name);
  }

  render(){
    debugger;
    let characters;
    if (this.props.characters.length) {
      characters = this.props.characters.map((character, idx) => {
        return (
            <NavLink
              to={`/characters/${character.character_id}`}
              key={idx}
              activeClassName="character-nav-active"
              className="character-nav-item"
              onClick={this.navGaEvent.bind(null, character.normalized_name)}>
              <CharacterNavigationItem character={character} />
            </NavLink>
        );
      });
    } else {
      characters = <span className="character-nav-item" >Loading...</span>
    }
    return(
      <section className="character-nav-container">
        <nav className="character-nav">
          <NavLink
            to={`/`}
            exact
            key={'series'}
            activeClassName="character-nav-active"
            className="series-nav-item character-nav-item"
            onClick={this.navGaEvent.bind(null, 'series')}>
            <div>series</div>
          </NavLink>
          <div className="angle-container" onClick={this.handleNavShift("left")}>
            <i className="fa fa-angle-left fa-angle" aria-hidden="true"></i>
          </div>
          <ul className="character-nav-list" ref={el => this.navListElement = el} >
            {characters}
            <div key="last" className="last-nav-padding">i</div>
          </ul>
          <div className="angle-container" onClick={this.handleNavShift("right")}>
            <i className="fa fa-angle-right fa-angle" aria-hidden="true"></i>
          </div>
        </nav>
      </section>
    );
  }
};

const mapStateToProps = (state) => {
  return ({
    characters: characterNavToOrderedArray(state.characters.entities)
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
