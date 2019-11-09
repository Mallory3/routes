//bring in express
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
//require dotenv
const dotenv = require('dotenv');
//envoke dotenv
dotenv.config();

//add defRouter model
const router = require('./routes/users');

//boot express
const app = express();
app.set('view engine','ejs');
//include if accepting post data in your app
app.use(express.urlencoded({extended: true}));


//need the mongoose code higher up, it is used to connect to db
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true,useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected!!!');
});


//set default route to homepage, after connected to db
app.get('/', function(request, response){
  response.render('users');
})


//add user route (app.use because using router: next set homepoint and boot our route);
app.use('/users', router)

// static assets
app.use(express.static(path.join(__dirname, 'public')));

//catch all 404 errors
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