const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

mongoose.connection.once('open', () => {
  console.log('Yup, connected to database: type I like');
})

const photoSchema = new Schema({
  photo: String,
  notes: String,
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'Wait, I need coordinates!'
    }],
    address: {
      type: String,
      required: 'Please supply an address.'
    }
  },
  author: String
});


module.exports = mongoose.model('Photo', photoSchema);