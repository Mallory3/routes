const express = require('express');

const router = express.Router();
//bring in model (../ gets out of routes folder into main directory)
const User = require('../models/Users.js')


//routes all go through the router we just created
//like any other get, we need to define a path (endpoint) and send a function passing request and response.
//Will eventually be used as router middleware, that uses higher functions. Like a mini app, or app within an app. Used to install functuality. 
router.get('/', async function(request, response){
  console.log('Get /')
  //repeating async code
  try {
    const users = await User.find({});
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);

    //use our form view {name:value}
    response.render('users',{users: users})
  } catch (err) {
    return response.status(500).send(err)
  }
})

//if resolved or rejected, mongoose will handle error because it returns a promise

router.get('/', function(request, response){
  console.log('GET /users/new');
  response.render('users', {});
})

//POST /users
router.post('/', function(request, response){
  const { name, email} = request.body;
  console.log('POST /users');
  const newUser = new User({
    name,
    email
  });
  newUser.save()
  response.redirect('/')
})

//export module
module.exports = router;
