import React from 'react';
import { scaleLinear } from 'd3-scale';
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
      const getLineCountInt = (obj) => parseInt(obj.line_count);
      const dataMax = parseInt(this.props.chart_data[0].line_count);
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, 300]);
   select(node)
      .selectAll('rect')
      .data(this.props.chart_data, (d) => {
        return getLineCountInt(d);
      })
      .enter()
      .append('rect');

   select(node)
      .selectAll('rect')
      .data(this.props.chart_data, (d) => {
        return getLineCountInt(d);
      })
      .exit()
      .remove();

   select(node)
      .selectAll('rect')
      .data(this.props.chart_data, (d) => {
        return parseInt(d.line_count);
      })
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => 300 - yScale(getLineCountInt(d)))
      .attr('height', d => yScale(getLineCountInt(d)))
      .attr('width', 25);
   }
render() {
      return <svg ref={node => this.node = node}
      width={500} height={500}>
      </svg>
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
