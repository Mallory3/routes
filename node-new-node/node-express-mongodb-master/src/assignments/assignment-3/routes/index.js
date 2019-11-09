const express = require('express');

const router = express.Router();
//bring in model (../ gets out of routes folder into main directory)
const User = require('../models/Users.js')


//routes all go through the router we just created
//like any other get, we need to define a path (endpoint) and send a function passing request and response.
//Will eventually be used as router middleware, that uses higher functions. Like a mini app, or app within an app. Used to install functuality. 
router.get('/', (request, response) => {
  console.log('Get /')
  //repeating async code
  User.find({}, (err, users) => {
    response.render('users',{users: users})
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
})
  

//if resolved or rejected, mongoose will handle error because it returns a promise

router.get('/', function(request, response){
  console.log('GET /users/new');
  response.render('index', {});
})

//POST /users (works but doesnt post)
// router.post('/', function(req, res){
//   const postData = new User(req.body);
//   console.log('POST /users');
//   postData.save().then( res => {
//     res.redirect('/');
// }).catch(err => {
//     res.status(400).send("Unable to save data");
// });
// });

//Post using endpoint
router.post('/adduser', (req, res) => {
 
  new User(req.body)
  .save()
 .then(result => { // note the use of a different variable name
   res.send(result); // also, you generally want to send *something* down that lets the user know what was saved.  Maybe not the whole object, but this is illustrative and the client will at least need to know something (e.g. the id) to refer to the object by in the future. 
 })
 .catch(err => {
   res.status(400).send('unable to save to database');
 });
});




//export module
module.exports = router;
console.log('export router')