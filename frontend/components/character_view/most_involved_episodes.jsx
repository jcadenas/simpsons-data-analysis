import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { format } from 'd3-format';
import { axisTop, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { connect } from 'react-redux';
import { fetchMostInvolvedEpisodes } from '../../actions/character_chart_actions';


class MostInvolvedEpisodes extends React.Component {

  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
    this.props.fetchMostInvolvedEpisodes(parseInt(this.props.characterId));
   }

   componentWillReceiveProps(newProps) {
     if (this.props.characterId !== newProps.characterId){
       this.props.fetchMostInvolvedEpisodes(parseInt(newProps.characterId));
     }
   }

   componentDidUpdate() {

     this.createBarChart()


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

   createBarChart() {
      const node = this.node;

      // Size of Data Visualization
      const margin = { top: 50, right: 50, bottom: 50, left: 200 };
      const outerWidth = 700;
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
      const xColumn = 'percent_of_lines';

      const getPercentOfLinesFloat = (obj) => parseFloat(obj.percent_of_lines);
      const dataMax = Math.ceil(parseFloat(this.props.chartData[0][xColumn]));
      const yScale = scaleBand()
        .domain(this.props.chartData.map( (d) => d[yColumn] ))
        .range([0, innerHeight])
        .paddingInner(innerPadding)
        .paddingOuter(outerPadding)

      const xScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, innerWidth]);

      const xAxis = axisTop(xScale)
         .ticks(5)
         .tickFormat(format(".0%"))
         .tickSizeOuter(0);
      const yAxis = axisLeft(yScale)
         .tickSizeOuter(0);

      xAxisG.transition().duration(300).call(xAxis);
      yAxisG.transition().duration(300).call(yAxis);



      // Enter & Bind
      group
        .selectAll('rect')
        .data(this.props.chartData)
        .enter()
        .append('rect');

      // Exit
      group
        .selectAll('rect')
        .data(this.props.chartData)
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
        .attr('width', d => xScale(getPercentOfLinesFloat(d)))
        .attr('height', yScale.bandwidth());

    // Adding Labels to the Bars
    // group
    //   .selectAll(".text")
    //   .data(this.props.chartData, (d) => {
    //     return getLineCountInt(d);
    //   })
    //   .enter()
    //   .append("text")
    //   .attr("class","label")
    //   .attr("x", d =>  1 + xScale(getLineCountInt(d)))
    //   .attr("y", d => yScale(d[yColumn]))
    //   .attr("dy", "1em")
    //   .text(d => getLineCountInt(d));

   }
render() {
      return <svg ref={node => this.node = node}></svg>
   }
}

//  Connect Store & Export Component

const mapStateToProps = state => {
  return ({
    chartData: state.charts.character.entities["most_involved_episodes"],
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchMostInvolvedEpisodes: (characterId) => dispatch(fetchMostInvolvedEpisodes(characterId))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MostInvolvedEpisodes);
