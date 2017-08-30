import React from 'react';
import { Route } from 'react-router-dom';
import OverView from './over_view/over_view';
import CharacterView from './character_view/character_view';
import Header from './landing/header';
import Navigation from './landing/navigation';


const App = () => {
  debugger;
  return (
    <header>
      <audio
        src={window.audios.simpsons_theme}
        autoPlay>
      </audio>
      <Header />
      <Navigation />
      <Route path="/" exact component={OverView} />
      <Route path="/characters/:characterId" component={CharacterView} />
    </header>
  );
};

export default App;
