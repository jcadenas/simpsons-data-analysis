import { combineReducers } from 'redux';
import ChartReducer from './chart_reducer';


const RootReducer = combineReducers({
  charts: ChartReducer
});

export default RootReducer;
