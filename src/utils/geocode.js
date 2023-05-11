const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZmFpemFsc2hpa2FsZ2FyIiwiYSI6ImNsZ2x2NzI2bTE1dTEzdWx2NGdnOWVmbDIifQ.7XgkKP3sCieeyaU-CQNH8A&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.');
    } else if (body.features.length === 0) {
      callback('Unable to find location, Try with another location name');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
