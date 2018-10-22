const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

const userSchema = new Schema({
  username: String,
  googleId: String,
  email: String,
  photos: []
});


module.exports = mongoose.model('User', userSchema);