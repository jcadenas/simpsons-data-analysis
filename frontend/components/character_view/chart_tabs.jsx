import React from 'react';


class Headers extends React.Component {
  render() {
    let selected = this.props.selectedPane;
    let headers = this.props.charts.map((chart, index) => {
      let title = chart.title;
      let klass = '';
      if (index === selected) {
        klass = 'active';
      }

      return (
        <li
          key={index}
          className={klass}
          onClick={this.props.onTabChosen.bind(null, index)}>
          {title}{' '}
        </li>
      );
    });
    return (
      <ul className='tab-header'>
        {headers}
      </ul>

    );
 }
}

class ChartTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPane: 0
    };
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(num) {
    this.setState({selectedPane: num});
  }

  render() {
    let pane = this.props.charts[this.state.selectedPane];

    return (
      <div>
        <h1>Tabs</h1>
        <div className='tabs'>
          <Headers
            selectedPane={this.state.selectedPane}
            onTabChosen={this.selectTab}
            charts={this.props.charts}>
          </Headers>
          <div className='tab-content'>
            <article>
              {pane.chart}
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartTabs
