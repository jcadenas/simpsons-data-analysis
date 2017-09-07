import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { format } from 'd3-format';
import { axisTop, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { connect } from 'react-redux';
import { fetchTopLocations } from '../../actions/chart_actions';


class TopLocations extends React.Component {

  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
    this.updateBarChart = this.updateBarChart.bind(this)
  }

  componentDidMount() {
    this.createBarChart();
    this.props.fetchTopLocations();
  }

  componentDidUpdate() {

    this.updateBarChart()

  }

  createBarChart() {

    // Size of Data Visualization
    this.margin = { top: 50, right: 50, bottom: 50, left: 130 };
    this.outerWidth = 500;
    this.outerHeight = 500;
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;
    this.innerPadding = 0.2;
    this.outerPadding = 0.4;


    // Update node's size
    select(this.node)
      .attr('width', this.outerWidth)
      .attr('height', this.outerHeight);

    this.group = select(this.node).append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.xAxisG = this.group.append("g");
    this.yAxisG = this.group.append("g");


  }

  updateBarChart() {
    const yColumn = 'name';
    const xColumn = 'line_count';

    const getLineCountInt = (obj) => parseInt(obj.line_count);
    const dataMax = Math.ceil(parseFloat(this.props.chartData[0][xColumn]));
    const yScale = scaleBand()
      .domain(this.props.chartData.map( (d) => d[yColumn] ))
      .range([0, this.innerHeight])
      .paddingInner(this.innerPadding)
      .paddingOuter(this.outerPadding)

    const xScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.innerWidth]);

    const xAxis = axisTop(xScale)
      .ticks(5)
      .tickFormat(format(".2s"))
      .tickSizeOuter(0);
    const yAxis = axisLeft(yScale)
      .tickSizeOuter(0);

    this.xAxisG.transition().duration(300).call(xAxis);
    this.yAxisG.transition().duration(300).call(yAxis);



    // Enter & Bind
    this.group
      .selectAll('rect')
      .data(this.props.chartData)
      .enter()
      .append('rect');

    // Exit
    this.group
      .selectAll('rect')
      .data(this.props.chartData)
      .exit()
      .remove();

    // Update
    this.group
      .selectAll('rect')
        .transition()
        .duration(300)
      .style('fill', '#3F7FBF')
      .attr('x', 1)
      .attr('y', d => yScale(d[yColumn]))
      .attr('width', d => xScale(getLineCountInt(d)))
      .attr('height', yScale.bandwidth());

  }

  render() {
    return (
      <article>
        <p className="chart-description">
          What are the top locations throughout Springfield based on total number of lines spoken at each spot?
        </p>
        <svg ref={node => this.node = node}></svg>
      </article>
    );
  }

}

//  Connect Store & Export Component

const mapStateToProps = state => {
  return ({
    chartData: state.charts.overview.entities["top_locations"],
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchTopLocations: () => dispatch(fetchTopLocations())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopLocations);
