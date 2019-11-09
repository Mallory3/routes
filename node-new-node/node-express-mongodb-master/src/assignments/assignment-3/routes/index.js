const express = require('express');
const mongoose = require('mongoose')

const router = express.Router();
//bring in model (../ gets out of routes folder into main directory)
const User = require('../models/Users')

// Index Page
router.get('/', (req, res) => res.render('index'));

// Success Page
router.get('/success', (req, res) => res.render('success'));

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true,useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected!!!');
});


//Newsletter Signup

router.post('/', (req, res) => {
  const name = req.body.name; 
  const email =req.body.email; 
  const adult = Boolean(req.body.adult)
  const newUser = new User({
    name,
    email,
    adult
  });

  db.collection('details').insertOne(newUser, (err, collection) => { 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
  })
  // res.redirect('/'); 
})



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





//export module
module.exports = router;
console.log('export router')