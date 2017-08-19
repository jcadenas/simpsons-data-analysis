import React from 'react';
import { Route } from 'react-router-dom';
import Overview from './overview/overview';


const App = () => {
  return (
    <header>
      <h2>Hi-dilly ho-dilly, neighbor-inho!</h2>
      <Route path="/" exact component={Overview} />
    </header>
  );
};

export default App;
