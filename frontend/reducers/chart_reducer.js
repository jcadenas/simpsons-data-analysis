import { combineReducers } from 'redux';
import OverviewChartReducer from './overview_chart_reducer';
import CharacterChartReducer from './character_chart_reducer';


const ChartReducer = combineReducers({
  overview: OverviewChartReducer,
  character: CharacterChartReducer
});

export default ChartReducer;
