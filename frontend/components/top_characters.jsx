import React from 'react';
import { scaleLinear, scaleBand} from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';


class TopCharacters extends React.Component {

  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
    this.props.fetchTopCharacters();
   }

   componentDidUpdate(nextProps) {
    this.createBarChart();
   }
   createBarChart() {
      const node = this.node;

      // Size of Data Visualization
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const outerWidth = 900;
      const outerHeight = 300;
      const innerWidth = outerWidth - margin.left - margin.right;
      const innerHeight = outerHeight - margin.top - margin.bottom;
      const innerPadding = 0.2;
      const outerPadding = 0.4;

      // Update node's size
      select(node)
        .attr('width', outerWidth)
        .attr('height', outerHeight);

      const yColumn = 'line_count';
      const xColumn = 'normalized_name';

      const getLineCountInt = (obj) => parseInt(obj.line_count);
      const dataMax = parseInt(this.props.chart_data[0][yColumn]);
      debugger;
      const xScale = scaleBand()
        .domain(this.props.chart_data.map( (d) => d[xColumn] ))
        .range([0, innerWidth])
        .paddingInner(innerPadding)
        .paddingOuter(outerPadding)

      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, innerHeight]);

  // Enter & Bind
   select(node)
      .selectAll('rect')
      .data(this.props.chart_data, (d) => {
        return getLineCountInt(d);
      })
      .enter()
      .append('rect');

  // Exit
   select(node)
      .selectAll('rect')
      .data(this.props.chart_data, (d) => {
        return getLineCountInt(d);
      })
      .exit()
      .remove();

  // Update
   select(node)
      .selectAll('rect')
      .data(this.props.chart_data, (d) => {
        return parseInt(d.line_count);
      })
      .style('fill', '#3F7FBF')
      .attr('x', (d) => xScale(d[xColumn]))
      .attr('y', d => innerHeight - yScale(getLineCountInt(d)))
      .attr('height', d => yScale(getLineCountInt(d)))
      .attr('width', xScale.bandwidth());
   }
render() {
      return <svg ref={node => this.node = node}></svg>
   }
}

//  Connect Store & Export Component

import { connect } from 'react-redux';
import { fetchTopCharacters } from '../actions/chart_actions';

const mapStateToProps = state => {
  // debugger;
  return ({
    chart_data: state.charts.entities["top_characters"],
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchTopCharacters: () => dispatch(fetchTopCharacters())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopCharacters);
