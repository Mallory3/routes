const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//add defRouter model
const defRouter = require('./routes/definitions');

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
  response.render('index');
})

//add definition route (app.use because using router: next set homepoint and boot our route);
app.use('/definitions', defRouter);

app.use(express.static(path.join(__dirname, 'public')));

//catch all 404 errors
app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});