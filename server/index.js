const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const Controller = require('./controller.js');
const controller = new Controller();

const pathName = path.join(__dirname, '/../client/dist');

app.use(express.static(pathName));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/theft', controller.theft);

app.get('/weather', controller.weather);

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});