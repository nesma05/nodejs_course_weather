const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const forecast = require("./utils/forcast");
const geolocation = require("./utils/geolocation");

const publicStaticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Yahia El aziz",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Yahia El aziz",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Good you created your first dynamic app",
    name: "Yahia El aziz",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geolocation(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yahia El aziz",
    errorMessage: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yahia El aziz",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("serv up on 3000");
});
