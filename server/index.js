const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const path = require('path');
const Controller = require('./controller.js');
const controller = new Controller();

const pathName = path.join(__dirname, '/../client/dist');

app.use(express.static(pathName));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/theft', controller.theft);

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});