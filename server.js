const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  console.log('here')
  res.sendFile(__dirname + '/index.html');
})

module.exports = app;
