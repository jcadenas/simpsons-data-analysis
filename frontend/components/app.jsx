import React from 'react';
import { Route } from 'react-router-dom';
import OverView from './over_view/over_view';
import CharacterView from './character_view/character_view';
import Header from './landing/header';
import Navigation from './landing/navigation';


const App = () => {
  return (
    <header>
      <Header />
      <Navigation />
      <Route path="/" exact component={OverView} />
      <Route path="/character/:characterId" component={CharacterView} />
    </header>
  );
};

export default App;
