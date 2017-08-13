import React from 'react';
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
import { format } from 'd3-format';
import { axisTop, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { connect } from 'react-redux';
import { fetchSeasonsByIMDBRating } from '../../actions/chart_actions';


class SeasonsByIMDBRating extends React.Component {

  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
    this.props.fetchSeasonsByIMDBRating();
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

      const yColumn = 'avg_ep_imdb_rating';
      const xColumn = 'season';
      const getIMDBRatingFloat = (obj) => parseFloat(obj.avg_ep_imdb_rating);
      const dataMax = Math.ceil(parseFloat(this.props.chart_data[0][yColumn]));
      const dataMin = Math.floor(parseFloat(this.props.chart_data[this.props.chart_data.length - 1][yColumn]));
      const xScale = scaleOrdinal()
        .domain(this.props.chart_data.map( (d) => d[xColumn] ))
        .range([0, innerWidth]);

      const yScale = scaleLinear()
         .domain([dataMin, dataMax])
         .range([0, innerHeight]);

      const xAxis = axisBottom(xScale)
         .ticks(5)
         .tickFormat(format(".2s"))
         .tickSizeOuter(0);
      const yAxis = axisLeft(yScale)
         .tickSizeOuter(0);

      xAxisG.transition().duration(300).call(xAxis);
      yAxisG.transition().duration(300).call(yAxis);

      const line = line()
        .x(d => xScale(d[xColumn]))
        .y(d => yScale(getIMDBRatingFloat(d)));

      group
        .append("path")
        .data(this.props.chart_data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);


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

const mapStateToProps = state => {
  return ({
    chart_data: state.charts.entities["seasons_by_imdb_rating"],
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
