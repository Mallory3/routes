//This is where we are storing our mongoose model

//Need to install its own dependencies because it is its own module. We dont have to re-install as we installed it for app.js
const mongoose = require('mongoose');

//This will take an object: for each will take another embedded object (object of objects)
//defines what data is going to look like
const definitionSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      definition: true
    },
    definition: {
      type: String,
      require: true
    }
  }
);

//compile model
//mongoose will look for Definitions on database
const Definition = mongoose.model('Definition', definitionSchema);

//Export module to export definitionSchema model
module.exports = Definition;

//anything you want is defined in model ie password, username, email...
