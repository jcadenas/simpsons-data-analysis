import React from 'react';
import { Route } from 'react-router-dom';
import OverView from './over_view/over_view';
import CharacterView from './character_view/character_view';
import Header from './landing/header';


const App = () => {
  return (
    <header>
      <Header />
      <Route path="/" exact component={OverView} />
      <Route path="/character/:characterId" component={CharacterView} />
    </header>
  );
};

export default App;
