import React from 'react';
import { Route } from 'react-router-dom';
import TopCharacters from './top_characters';


const App = () => {
  return (
    <header>
      <h2>Hi-dilly ho-dilly, neighbor-inho!</h2>
      <TopCharacters />
    </header>
  );
};

export default App;

// <TopCharacters data={[
//     {
//       "character_id": "2",
//       "normalized_name":"homer simpson",
//       "line_count":"30105"
//     },
//     {
//       "character_id":"1",
//       "normalized_name":"marge simpson",
//       "line_count":"14264"
//     },
//     {
//       "character_id":"8",
//       "normalized_name":"bart simpson",
//       "line_count":"13962"
//     },
//     {
//       "character_id":"9",
//       "normalized_name":"lisa simpson",
//       "line_count":"11638"
//     }
//     ]} size={[500,200]} />
