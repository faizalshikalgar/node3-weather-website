const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=07cc3f611c67473d85f100124230805&q=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.');
    } else if (body.error) {
      callback(body.error.message);
    } else {
      callback(
        undefined,
        `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out. It feels like ${body.current.feelslike_c} degrees out.`
      );
    }
  });
};

module.exports = forecast;
