import { combineReducers } from 'redux';
import ChartReducer from './chart_reducer';
import CharacterReducer from './character_reducer';


const RootReducer = combineReducers({
  charts: ChartReducer,
  characters: CharacterReducer
});

export default RootReducer;
