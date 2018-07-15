const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
// mongoose.connection.on('error', (err) => {
//   console.error(`🚫 → ${err.message}`);
// });
mongoose.connection.once('open', () => {
  console.log('Yup, connected to database: type I like');
})

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  console.log('here');
  res.sendFile(__dirname + '/dist/index.html');
})
//test
// app.get('/add', (req, res) => {
//   console.log('add route');
//   res.sendFile(__dirname + '/dist/index.html');
// })

module.exports = app;
