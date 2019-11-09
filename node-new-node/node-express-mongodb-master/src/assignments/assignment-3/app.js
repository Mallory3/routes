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


// app.get('/', function(request, response){
//   response.render('./index');
//   console.log("got home users")
// })


// app.post('/signup', function(req,res){ 
//   const name = req.body.name; 
//   const email =req.body.email; 

//   const userdata = { 
//       "name": name, 
//       "email": email
//   } 

// db.collection('details').insertOne(userdata, (err, collection) => { 
//       if (err) throw err; 
//       console.log("Record inserted Successfully"); 
            
//   }); 
        
//   return res.redirect('/signup_success'); 
// }) 


// app.get('/',function(req,res){ 
// res.set({ 
//   'Access-control-Allow-Origin': '*'
//   }); 
// return res.redirect('index'); 
// })










//set default route to homepage, after connected to db (works!)
// app.get('/', function(request, response){
//   response.render('./index');
//   console.log("got home users")
// })

//This will take an object: for each will take another embedded object (object of objects)
//defines what data is going to look like
// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       require: true
//     },
//     adult: {
//       type: Boolean,
//       default: false

//     }
//   }
// );

//compile model
//mongoose will look for Users on database



// app.get('/', (request, response) => {
//   console.log('Get /')
//   //repeating async code
//   User.find({}, (err, users) => {
//     response.render('users',{users: users})
//     console.log(`Mongoose connection open on ${process.env.DATABASE}`);
//   })
// })
  

//if resolved or rejected, mongoose will handle error because it returns a promise

// app.get('/', function(request, response){
//   console.log('GET /users/new');
//   response.render('index', {});
// })

// POST /users (works but doesnt post)
// app.post('/', function(req, res){
//   const postData = new userSchema(req.body);
//   console.log('POST /users');
//   postData.save().then( res => {
//     res.redirect('/');
// }).catch(err => {
//     res.status(400).send("Unable to save data");
// });
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