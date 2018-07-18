const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
// mongoose.connection.on('error', (err) => {
//   console.error(`🚫 → ${err.message}`);
// });
mongoose.connection.once('open', () => {
  console.log('Yup, connected to database: type I like');
})

const photoSchema = new Schema({
  photo: {
    type: String,
    required: 'Please select a photo!'
  }
  // notes: {
  //   type: String
  // }
});


module.exports = mongoose.model('Photo', photoSchema);