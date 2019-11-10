
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    summary: {
      type: String,
      require: true
    },
    body: {
      type: String,
      require: true
    },
    slug: {
      type: String,
      required: true
    }
  }
);

const Articles = mongoose.model('articles', articleSchema);

//Export module to export userSchema model
module.exports = Articles;
console.log("module exported")