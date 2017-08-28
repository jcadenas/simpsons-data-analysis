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

  constructor(props) {
    super(props);
    this.createLineChart = this.createLineChart.bind(this);
    this.updateLineChart = this.updateLineChart.bind(this);
  }

  componentDidMount() {
     this.createLineChart();
     this.props.fetchSeasonsByIMDBRating();
  }

  componentDidUpdate() {
    this.updateLineChart();


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

      // Size of Data Visualization
      this.margin = { top: 50, right: 10, bottom: 50, left: 50 };
      this.outerWidth = 500;
      this.outerHeight = 500;
      this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
      this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;

      // Update node's size
      select(this.node)
        .attr('width', this.outerWidth)
        .attr('height', this.outerHeight);

      this.group = select(this.node).append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
      this.xAxisG = this.group.append("g")
        .attr("transform", "translate(0," + this.innerHeight + ")");
      this.yAxisG = this.group.append("g");

  }

  updateLineChart() {
     const yColumn = 'avg_ep_imdb_rating';
     const xColumn = 'season';
     const getIMDBRatingFloat = (obj) => parseFloat(obj.avg_ep_imdb_rating);
     // const dataMax = Math.ceil(parseFloat(this.props.chartData[0][yColumn]));
     // const dataMin = Math.floor(parseFloat(this.props.chartData[this.props.chartData.length - 1][yColumn]));
     const xScale = scalePoint()
       .domain(this.props.chartData.map( (d) => d[xColumn]))
       .range([0, this.innerWidth]);

     const yScale = scaleLinear()
        .domain([9, 6])
        .range([0, this.innerHeight]);

     const xAxis = axisBottom(xScale);
     const yAxis = axisLeft(yScale);
       //  .tickSizeOuter(0);

     this.xAxisG.transition().duration(300).call(xAxis);
     this.yAxisG.transition().duration(300).call(yAxis);


     // Enter & Bind
     this.group
       .selectAll('circle')
       .data(this.props.chartData)
       .enter()
       .append('circle');

     // Exit
     this.group
       .selectAll('circle')
       .data(this.props.chartData)
       .exit()
       .remove();

     // Update
     this.group
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
    return (
      <article>
        <p className="chart-description">
          How has a season's averge episode IMDB Rating trended?
        </p>
        <svg ref={node => this.node = node}></svg>
      </article>
    );
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
