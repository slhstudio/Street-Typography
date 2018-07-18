const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const path = require('path');
const mongoose = require ('mongoose');
const photoController = require ('./app/controllers/photoController')

app.use(express.static(path.resolve(__dirname, 'public', 'dist')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log('listening on 3000')
})

// app.get('/', (req, res) => {
//   console.log('here');
//   res.sendFile(__dirname + '/public/dist/index.html');
// })
//test
// app.get('/add', (req, res) => {
//   console.log('add route');
//   res.sendFile(__dirname + '/dist/index.html');
// })

app.post('/add', photoController.upload, photoController.resize, photoController.savePhoto);

//photoController.savePhoto);

module.exports = app;
