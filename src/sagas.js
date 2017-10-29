import { takeEvery, put, call, select } from 'redux-saga/effects';
import * as weatherActions from './actions';

function* getLocation(action) {
  const position = yield call(findLocation);
  yield put(
    weatherActions.updateLocation({
      location: {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
    })
  );

  yield* getWeather(weatherActions.getLocation());
}

function* getWeather(action) {
  const getLocation = state => state.weather.location;
  const location = yield select(getLocation);
  const weather = yield call(fetchWeather, location);
  yield put(weatherActions.updateWeather(weather));
}

function* weatherSaga() {
  yield takeEvery('GET_LOCATION', getLocation);
  yield takeEvery('GET_WEATHER', getWeather);
}

//helper functions

function findLocation() {
  const geolocation = navigator.geolocation;
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      () => {
        reject(new Error('Permission denied'));
      }
    );
  });
  return location;
}

function fetchWeather(location) {
  let urls = [];
  const lat = `lat=${location.location.lat}`;
  const lon = `lon=${location.location.lon}`;
  const urlPrefix_current = 'http://api.openweathermap.org/data/2.5/weather?'; // current weather
  const urlPrefix_forecast = 'http://api.openweathermap.org/data/2.5/forecast?'; // forecast
  const urlSuffix = '&APPID=b2bb9a0b4e903ed86147ea0fda12d3be&units=metric';
  const currentUrl = urlPrefix_current + lat + '&' + lon + urlSuffix;
  const forecastUrl = urlPrefix_forecast + lat + '&' + lon + urlSuffix;

  urls.push(currentUrl, forecastUrl);

  var promises = urls.map(function(url, i) {
    return fetch(url)
      .then(statusHelper)
      .then(response => {
        return response.json();
      })
      .catch(error => error)
      .then(data => {
        return data;
      });
  });

  function statusHelper(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  return Promise.all(promises).catch(function(error) {
    console.log(error);
  });
}

export default weatherSaga;
