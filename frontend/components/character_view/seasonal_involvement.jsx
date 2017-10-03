import React from 'react';
import { scaleLinear, scaleBand, scalePoint } from 'd3-scale';
import { format } from 'd3-format';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import * as D3Shape from 'd3-shape';
import { connect } from 'react-redux';
import { fetchSeasonalInvolvement } from '../../actions/character_chart_actions';


class SeasonalInvolvement extends React.Component {

  constructor(props) {
    super(props);
    this.createLineChart = this.createLineChart.bind(this);
    this.updateLineChart = this.updateLineChart.bind(this);
  }

  componentDidMount() {
     this.createLineChart();
     this.props.fetchSeasonalInvolvement(parseInt(this.props.characterId));
  }

  componentWillReceiveProps(newProps) {
    if (this.props.characterId !== newProps.characterId) {
      this.props.fetchSeasonalInvolvement(parseInt(newProps.characterId));
    }
  }

  componentDidUpdate() {
    this.updateLineChart();

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
     const yColumn = 'character_season_involvement';
     const xColumn = 'season';
     const xScale = scalePoint()
       .domain(this.props.chartData.map( (d) => d[xColumn]))
       .range([0, this.innerWidth]);

     const yScale = scaleLinear()
        .domain([1, 0])
        .range([0, this.innerHeight]);

     const xAxis = axisBottom(xScale);
     const yAxis = axisLeft(yScale)
        .tickFormat(format(".0%"))
        .ticks(10);

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

  }

  render() {
    return (
      <article>
        <p className="chart-description">
          What percentage of episodes did the character have a spoken line in each season?
        </p>
        <svg ref={node => this.node = node}></svg>
      </article>
    );
  }

}

//  Connect Store & Export Component

const mapStateToProps = state => {
  return ({
    chartData: state.charts.character.entities["seasonal_involvement"],
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchSeasonalInvolvement: (character_id) => dispatch(fetchSeasonalInvolvement(character_id))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeasonalInvolvement);
