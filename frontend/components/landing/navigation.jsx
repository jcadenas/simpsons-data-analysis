import React from 'react';
import { fetchNavCharacters } from '../../actions/navigation_actions';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import CharacterNavigationItem from './character_navigation_item';


class CharacterNavigation extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchNavCharacters();
  }

  render(){
    if (this.props.characters.length) {
      const characters = this.props.characters.map((character, idx) => {
        return (
          <NavLink
            to={`/characters/${character.character_id}`}
            key={idx}
            activeClassName="character-nav-active"
            className="character-nav-item">
            <CharacterNavigationItem character={character} />
          </NavLink>
        );
      });
      return(
        <nav className="character-nav">
          <i className="fa fa-angle-left fa-angle" aria-hidden="true"></i>
          <ul className="character-nav-list">
            {characters}
          </ul>
          <i className="fa fa-angle-right fa-angle" aria-hidden="true"></i>
        </nav>
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
    characters: state.characters.entities
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchNavCharacters: () => dispatch(fetchNavCharacters())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterNavigation);
