export const getLocation = () => {
  return {
    type: 'GET_LOCATION'
  };
};

export const getWeather = () => {
  return {
    type: 'GET_WEATHER'
  };
};

export const updateLocation = payload => {
  return {
    type: 'UPDATE_LOCATION',
    payload
  };
};

export const updateWeather = payload => {
  return {
    type: 'UPDATE_WEATHER',
    payload
  };
};
