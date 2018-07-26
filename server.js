const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const path = require('path');
const mongoose = require ('mongoose');
const photoController = require ('./app/controllers/photoController')

app.use(express.static(path.resolve(__dirname, 'public', 'dist')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.post('/addPhoto', photoController.upload, photoController.resize, photoController.savePhoto);

app.get('/findphoto/:photo', photoController.findPhoto)
app.get('/findAllPhotos', photoController.getAll)

app.get('/*', (req, res) => {
  console.log('here');
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
})





module.exports = app;
