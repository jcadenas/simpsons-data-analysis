import React from 'react';
import { Route } from 'react-router-dom';
import TopCharacters from './top_characters';


const App = () => {
  return (
    <header>
      <h2>Hi-dilly ho-dilly, neighbor-inho!</h2>
      <TopCharacters data={[5,10,1,3, 7, 0, 2]} size={[500,200]} />
    </header>
  );
};

export default App;
