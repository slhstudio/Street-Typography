const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const path = require('path');
const photoController = require ('./app/controllers/photoController');
const authRoutes = require ('./app/routes/auth-routes');  

app.use(express.static(path.resolve(__dirname, 'public', 'dist')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('listening on 3000')
});

//create
app.post('/addPhoto', photoController.upload, photoController.resize, photoController.savePhoto);

//read
app.get('/findphoto/:photo', photoController.findPhoto);
app.get('/findAllPhotos', photoController.getAll);

//update
app.post('/uploadChange/:photo', photoController.update);

//delete
app.delete('/delete/:image', photoController.deletePhoto);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
})


module.exports = app;
