import { combineReducers } from 'redux';

const initialState = {
  loadingLocation: false,
  loadingWeather: false,
  location: {},
  weather: {}
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LOCATION':
      return { ...state, loadingLocation: true };

    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload, loadingLocation: false };

    case 'GET_WEATHER':
      return { ...state, loadingWeather: true };

    case 'UPDATE_WEATHER':
      return { ...state, weather: action.payload, loadingWeather: false };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  weather: weatherReducer
});

export default rootReducer;
