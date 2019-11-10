const dotenv = require('dotenv');
//envoke dotenv
dotenv.config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


//boot express
const app = express();

//need the mongoose code higher up, it is used to connect to db (works!)
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true,useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected!!!');
});

//EJS
app.set('view engine','ejs');
//include if accepting post data in your app
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/', require('./routes/index'));




//article code
// const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config();

// const articles = require('./fixtures/articles');
// const users = require('./fixtures/users');

// const uri = process.env.DB_CONNECTION;
// MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
//    if(err) {
//       console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    // perform actions on the collection object

//    const db = client.db("final-project");

//    const artCol = db.collection('articles');

//    artCol.drop();
//    artCol.insertMany(articles, function(err, cursor) {
//     if (err) {
//       console.log('There was a problem');
//     }
//     console.log(cursor.insertedCount);
//   });

//   const userCol = db.collection('users');

//   userCol.drop();
//   userCol.insertMany(users, function(err, cursor) {
//    if (err) {
//      console.log('There was a problem');
//    }
//    console.log(cursor.insertedCount);
//  });

//   client.close();
// });










// static assets
app.use(express.static(path.join(__dirname, 'public')));

//catch all 404 errors (works!)
app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});


//create a port to run app on
const PORT = process.env.PORT || 3000;

//create a server and bring in the port
app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});