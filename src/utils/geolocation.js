const needle = require("needle");

const geolocation = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=pk.eyJ1IjoibmVzbWEwNSIsImEiOiJja2ZsMHBhcmkwb2t6MnNuenIwcGd4ZDFvIn0.4y3WQ1P7t-5ftW7RlyjtjA&limit=1`;

  needle.get(url, function (error, { body }) {
    const data = JSON.parse(body);

    if (error) {
      callback("Connection failed");
    } else if (data.features.length === 0) {
      callback("No Location Found");
    } else {
      callback(null, {
        latitude: data.features[0].center[0],
        longitude: data.features[0].center[1],
        location: data.features[0].place_name,
      });
    }
  });
};

module.exports = geolocation;
