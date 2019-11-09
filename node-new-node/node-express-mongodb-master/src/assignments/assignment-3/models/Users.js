//This is where we are storing our mongoose model

//Need to install its own dependencies because it is its own module. We dont have to re-install as we installed it for app.js
const mongoose = require('mongoose');

//This will take an object: for each will take another embedded object (object of objects)
//defines what data is going to look like
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    adult: {
      type: Boolean,
      required: true,
      default: false
    }
  }
);


//compile model
//mongoose will look for Users on database
const User = mongoose.model('Users', userSchema);

//Export module to export userSchema model
module.exports = User;
console.log("module exported")

//anything you want is defined in model ie password, username, email...