import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { format } from 'd3-format';
import { axisTop, axisLeft } from 'd3-axis';
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
      const margin = { top: 50, right: 50, bottom: 50, left: 130 };
      const outerWidth = 500;
      const outerHeight = 700;
      const innerWidth = outerWidth - margin.left - margin.right;
      const innerHeight = outerHeight - margin.top - margin.bottom;
      const innerPadding = 0.2;
      const outerPadding = 0.4;

      // Update node's size
      select(node)
        .attr('width', outerWidth)
        .attr('height', outerHeight);

      const group = select(node).append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      const xAxisG = group.append("g");
      const yAxisG = group.append("g");

      const yColumn = 'normalized_name';
      const xColumn = 'line_count';

      const getLineCountInt = (obj) => parseInt(obj.line_count);
      const dataMax = parseInt(this.props.chart_data[0][xColumn]);
      const yScale = scaleBand()
        .domain(this.props.chart_data.map( (d) => d[yColumn] ))
        .range([0, innerHeight])
        .paddingInner(innerPadding)
        .paddingOuter(outerPadding)

      const xScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, innerWidth]);

      const xAxis = axisTop(xScale)
         .ticks(5)
         .tickFormat(format("s"))
         .tickSizeOuter(0);
      const yAxis = axisLeft(yScale)
         .tickSizeOuter(0);

      xAxisG.call(xAxis);
      yAxisG.call(yAxis);



  // Enter & Bind
   group
      .selectAll('rect')
      .data(this.props.chart_data, (d) => {
        return getLineCountInt(d);
      })
      .enter()
      .append('rect');

  // Exit
   group
      .selectAll('rect')
      .data(this.props.chart_data, (d) => {
        return getLineCountInt(d);
      })
      .exit()
      .remove();

  // Update
   group
      .selectAll('rect')
      .data(this.props.chart_data, (d) => {
        return getLineCountInt(d);
      })
      .style('fill', '#3F7FBF')
      .attr('x', 1)
      .attr('y', d => yScale(d[yColumn]))
      .attr('width', d => xScale(getLineCountInt(d)))
      .attr('height', yScale.bandwidth());

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
