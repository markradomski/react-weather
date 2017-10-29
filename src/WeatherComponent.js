import React, { Component } from 'react';
import logo from './logo.svg';
import store from './configureStore';
import * as weatherActions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Plot from './Plot.js';

class LocationWeather extends Component {
  state = {
    location: '',
    dates: [],
    temps: [],
    selected: {
      date: '',
      temp: null
    }
  };

  componentWillReceiveProps(nextProps) {
    const { weather } = nextProps;
    console.log('weather', weather);
    if (weather && weather[1]) {
      this.createForecast(weather[1].list);
    }
  }

  onPlotClick = data => {
    if (data.points) {
      this.setState({
        selected: {
          date: data.points[0].x,
          temp: data.points[0].y
        }
      });
    }
  };

  createForecast(list) {
    let dates = [];
    let temps = [];
    for (let i = 0; i < list.length; i++) {
      dates.push(list[i].dt_txt);
      temps.push(list[i].main.temp);
    }
    this.setState({
      dates: dates,
      temps: temps,
      selected: {
        date: '',
        temp: null
      }
    });
  }

  render() {
    const { weather } = this.props;
    const currentWeather = weather[0];
    const forecastWeather = weather[1];

    if (currentWeather) {
      return (
        <div>
          <p>
            Current weather in {currentWeather.name} is{' '}
            {currentWeather.main.temp} °C
          </p>

          <h4>5 day Forecast</h4>
          <Plot
            xData={this.state.dates}
            yData={this.state.temps}
            onPlotClick={this.onPlotClick}
            type="scatter"
          />
        </div>
      );
    }
    return null;
  }
}

class WeatherComponent extends Component {
  componentWillMount() {
    store.dispatch(weatherActions.getLocation());
  }

  render() {
    return (
      <div>
        <h1>The weather</h1>
        {this.props.loadingLocation ? (
          <div class="loader">Loading...</div>
        ) : (
          [<LocationWeather {...this.props} />]
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingWeather: state.weather.loadingWeather,
    loadingLocation: state.weather.loadingLocation,
    location: state.weather.location,
    weather: state.weather.weather
  };
};

const mapDispatchToProps = dispatch => {
  return {
    weatherActions: bindActionCreators(weatherActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherComponent);
