const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engines and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve static files
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Faizal Shikalgar',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Faizal Shikalgar',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This some helpful text',
    title: 'Help',
    name: 'Faizal Shikalgar',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send([
          {
            forecast: forecastData,
            location,
            address: req.query.address,
          },
        ]);
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Faizal Shikalgar',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Faizal Shikalgar',
    errorMessage: 'Page Not Found',
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
