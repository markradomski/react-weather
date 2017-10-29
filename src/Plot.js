/* global Plotly */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Plot extends Component {
  static propTypes = {
    onPlotClick: PropTypes.func,
    xData: PropTypes.array.isRequired,
    yData: PropTypes.array.isRequired,
    type: PropTypes.string
  };

  drawPlot = () => {
    Plotly.newPlot(
      'plot',
      [
        {
          x: this.props.xData,
          y: this.props.yData,
          type: this.props.type,
          line: { shape: 'spline' },
          mode: 'lines+markers',
          name: 'spline'
        }
      ],
      {
        margin: {
          t: 0,
          r: 50,
          l: 50
        },
        xaxis: {
          gridcolor: 'transparent'
          // title: 'x-axis title'
        },
        yaxis: {
          //title: 'y-axis title'
        }
      },
      {
        displayModeBar: false
      }
    );
    document.getElementById('plot').on('plotly_click', this.props.onPlotClick);
  };

  componentDidMount() {
    this.drawPlot();
  }

  componentDidUpdate() {
    this.drawPlot();
  }

  render() {
    return <div id="plot" />;
  }
}

export default Plot;
