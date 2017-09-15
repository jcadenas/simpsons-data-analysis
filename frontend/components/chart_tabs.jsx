import React from 'react';


class Headers extends React.Component {
  render() {
    let selected = this.props.selectedPane;
    let headers = this.props.charts.map((chart, index) => {
      let title = chart.title;
      let klass = 'tab-header ';
      if (index === selected) {
        klass = klass + 'active-tab';
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
      <ul className='tab-header-list'>
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
    ga('send', 'event', 'chartNavigation', 'chartSelected', this.props.charts[num].title);
    this.setState({selectedPane: num});
  }

  render() {
    let pane = this.props.charts[this.state.selectedPane];

    return (
        <section className='charts-container'>
          <section className='headers-container'>
            <h3 className='tab-headers-header'>views</h3>
            <Headers
              selectedPane={this.state.selectedPane}
              onTabChosen={this.selectTab}
              charts={this.props.charts}>
            </Headers>
          </section>
          <div className='tab-content'>
            <h3 className='chart-header'>{pane.title}</h3>
            <article className='chart-article'>
              {pane.chart}
            </article>
          </div>
        </section>
    );
  }
}

export default ChartTabs
