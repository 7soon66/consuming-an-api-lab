const express = require('express');
const axios = require('axios');


const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({
 extended: true }));

app.get('/', (req, res) => {
  res.render('index');

});

app.post('/weather', async (req, res) => {
  const zipCode = req.body.zipCode;
  const apiKey = '6f8c1e416d55bf15c53508313ad3e9d3'; 

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${zipCode}&APPID=${apiKey}`);
    const weatherData = response.data;

   
    res.render('weather/show', {
      city: weatherData.name,
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description
    });
  } catch (error) {
    console.error(error);
    res.send('Error fetching weather data');
  }
});

app.get('/weather/show', (req, res) => {
  const { city, temp, description } = req.query;
  res.render('weather/show', { city, temp, description });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});