const needle = require("needle");

const forcast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7c5cac8a0b4175fb32186f227d6e2f48&query=${long},${lat}`;

  needle.get(url, function (error, { body }) {
    if (error) {
      callback("No Connection Established");
    } else if (body.error) {
      callback("Their is no such location");
    } else {
      callback(
        null,
        `${body.current.weather_descriptions[0]}. The temperature is ${body.current.temperature} degree, but it feels like ${body.current.feelslike} degree`
      );
    }
  });
};

module.exports = forcast;
