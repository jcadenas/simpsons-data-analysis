import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { format } from 'd3-format';
import { axisTop, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
import { max } from 'd3-array';
import { select } from 'd3-selection';


class TopEpisodes extends React.Component {

  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
    this.props.fetchTopEpisodes();
   }

   componentDidUpdate() {

     this.createBarChart()


    // Cool animation code. Not yet complete.
    // const slices = [];
    // for (let i = 0; i < this.props.chart_data.length; i++) {
    //   slices.push(this.props.chart_data.slice(0, i+1));
    // }
    //
    // slices.forEach( (slice, index) => {
    //   setTimeout( () => {
    //     this.draw(slice);
    //   }, index * 300);
    // });
   }

   createBarChart() {
      const node = this.node;

      // Size of Data Visualization
      const margin = { top: 50, right: 50, bottom: 50, left: 130 };
      const outerWidth = 500;
      const outerHeight = 500;
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

      const yColumn = 'title';
      const xColumn = 'imdb_rating';

      const getIMDBRatingFloat = (obj) => parseFloat(obj.imdb_rating);
      // const dataMax = Math.ceil(parseFloat(this.props.chart_data[0][xColumn]));
      const dataMin = Math.floor(parseFloat(this.props.chart_data[this.props.chart_data.length - 1][xColumn]));
      const yScale = scaleBand()
        .domain(this.props.chart_data.map( (d) => d[yColumn] ))
        .range([0, innerHeight])
        .paddingInner(innerPadding)
        .paddingOuter(outerPadding)

      const xScale = scaleLinear()
         .domain([8.5, 9.2])
         .range([0, innerWidth]);

      const xAxis = axisTop(xScale)
         .ticks(5)
         .tickFormat(format(".2s"))
         .tickSizeOuter(0);
      const yAxis = axisLeft(yScale)
         .tickSizeOuter(0);

      xAxisG.transition().duration(300).call(xAxis);
      yAxisG.transition().duration(300).call(yAxis);


  // Enter & Bind
   group
      .selectAll('rect')
      .data(this.props.chart_data)
      .enter()
      .append('rect');
  debugger;
  // Exit
   group
      .selectAll('rect')
      .data(this.props.chart_data)
      .exit()
      .remove();

  // Update
   group
      .selectAll('rect')
        .transition()
        .duration(300)
      .style('fill', '#3F7FBF')
      .attr('x', 1)
      .attr('y', d => yScale(d[yColumn]))
      .attr('width', d => xScale(getIMDBRatingFloat(d)))
      .attr('height', yScale.bandwidth());

    // Adding Labels to the Bars
    // group
    //   .selectAll(".text")
    //   .data(this.props.chart_data, (d) => {
    //     return getIMDBRatingFloat(d);
    //   })
    //   .enter()
    //   .append("text")
    //   .attr("class","label")
    //   .attr("x", d =>  1 + xScale(getIMDBRatingFloat(d)))
    //   .attr("y", d => yScale(d[yColumn]))
    //   .attr("dy", "1em")
    //   .text(d => getIMDBRatingFloat(d));

   }
render() {
      return <svg ref={node => this.node = node}></svg>
   }
}

//  Connect Store & Export Component

import { connect } from 'react-redux';
import { fetchTopEpisodes } from '../actions/chart_actions';

const mapStateToProps = state => {
  return ({
    chart_data: state.charts.entities["top_episodes"],
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchTopEpisodes: () => dispatch(fetchTopEpisodes())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopEpisodes);
