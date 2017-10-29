# Instructions

Create a simple react app that tells the user what the weather is like on their location. You will need to acquire the location and the weather seperately. The location should be acquired from the browsers location api. The weather can be obtained from openweathermap.org. Sign up for a free account there and use their API to get the weather. See https://openweathermap.org/api for more details

I have pre-written most of the stuff you mentioned you had no experience with. This means the redux stuff is already done, and the saga skeleton is already written. The base of this code is the create-react-app command line tool, so that is why there are some weird things in there.

How to start the project:
First do `yarn install`
Then do `yarn start`

Important files:
- WeatherComponent.js: this is where the react stuff should go into
- actions.js: these functions are redux action creators, which return simple js objects
- reducer.js: this is the redux reducer
- sagas.js: this is where you should create the functions that get the user location and the weather

Bonus points:
- Add error handling (like when the user does not want to share their location)
- Do something cool

Redux is used heavily in our application, so knowing how it works would be really useful, even for yourself as a React developer. If you need any information about redux or sagas, their website provide excellent documentation.
# react-weather
