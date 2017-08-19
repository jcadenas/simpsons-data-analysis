import React from 'react';
import { scaleLinear, scaleBand, scalePoint } from 'd3-scale';
import { format } from 'd3-format';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import * as D3Shape from 'd3-shape';
import { connect } from 'react-redux';
import { fetchSeasonsByIMDBRating } from '../../actions/chart_actions';


class SeasonsByIMDBRating extends React.Component {

  constructor(props){
    super(props)
    this.createLineChart = this.createLineChart.bind(this)
   }
   componentDidMount() {
    this.props.fetchSeasonsByIMDBRating();
   }

   componentDidUpdate() {

     this.createLineChart()


    // Cool animation code. Not yet complete.
    // const slices = [];
    // for (let i = 0; i < this.props.chartData.length; i++) {
    //   slices.push(this.props.chartData.slice(0, i+1));
    // }
    //
    // slices.forEach( (slice, index) => {
    //   setTimeout( () => {
    //     this.draw(slice);
    //   }, index * 300);
    // });
   }

   createLineChart() {
      const node = this.node;

      // Size of Data Visualization
      const margin = { top: 50, right: 10, bottom: 50, left: 50 };
      const outerWidth = 500;
      const outerHeight = 500;
      const innerWidth = outerWidth - margin.left - margin.right;
      const innerHeight = outerHeight - margin.top - margin.bottom;

      // Update node's size
      select(node)
        .attr('width', outerWidth)
        .attr('height', outerHeight);

      const group = select(node).append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      const xAxisG = group.append("g")
        .attr("transform", "translate(0," + innerHeight + ")");
      const yAxisG = group.append("g");

      const yColumn = 'avg_ep_imdb_rating';
      const xColumn = 'season';
      const getIMDBRatingFloat = (obj) => parseFloat(obj.avg_ep_imdb_rating);
      // const dataMax = Math.ceil(parseFloat(this.props.chartData[0][yColumn]));
      // const dataMin = Math.floor(parseFloat(this.props.chartData[this.props.chartData.length - 1][yColumn]));
      const xScale = scalePoint()
        .domain(this.props.chartData.map( (d) => d[xColumn]))
        .range([0, innerWidth]);

      const yScale = scaleLinear()
         .domain([9, 6])
         .range([0, innerHeight]);

      const xAxis = axisBottom(xScale);
      const yAxis = axisLeft(yScale);
        //  .tickSizeOuter(0);

      xAxisG.transition().duration(300).call(xAxis);
      yAxisG.transition().duration(300).call(yAxis);


      // Enter & Bind
      group
        .selectAll('circle')
        .data(this.props.chartData)
        .enter()
        .append('circle');

      // Exit
      group
        .selectAll('circle')
        .data(this.props.chartData)
        .exit()
        .remove();

      // Update
      group
        .selectAll('circle')
          .transition()
          .duration(300)
        .attr("r", 3.5)
        .attr('cx', d => xScale(d[xColumn]))
        .attr('cy', d => yScale(d[yColumn]))
        .style("stroke", 'black')
        .style("fill", 'steelblue');


      // Line Chart Below
      // const line = D3Shape.line()
      //   .x(d => xScale(d[xColumn]))
      //   .y(d => yScale(getIMDBRatingFloat(d)));
      //
      // group
      //   .append("path")
      //   .datum(this.props.chartData)
      //   .attr("fill", "none")
      //   .attr("stroke", "steelblue")
      //   .attr("stroke-linejoin", "round")
      //   .attr("stroke-linecap", "round")
      //   .attr("stroke-width", 1.5)
      //   .attr("d", line);


    // Adding Labels to the Bars
    // group
    //   .selectAll(".text")
    //   .data(this.props.chartData, (d) => {
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

const mapStateToProps = state => {
  return ({
    chartData: state.charts.overview.entities["seasons_by_imdb_rating"],
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchSeasonsByIMDBRating: () => dispatch(fetchSeasonsByIMDBRating())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeasonsByIMDBRating);
