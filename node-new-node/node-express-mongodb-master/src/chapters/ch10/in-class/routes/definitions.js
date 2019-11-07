//require express within express app
const express = require('express');

const defRouter = express.Router();
//bring in model (../ gets out of routes folder into main directory)
const Definition = require('../models/definitions.js')

//routes all go through the router we just created
//like any other get, we need to define a path (endpoint) and send a function passing request and response.
//Will eventually be used as router middleware, that uses higher functions. Like a mini app, or app within an app. Used to install functuality. 
defRouter.get('/', async function(request, response){
  console.log('Get /')
  //repeating async code
  try {
    const definitions = await Definition.find({});
    //use our definitions view {name:value}
    response.render('definitions',{defintions: definitions})
  } catch (err) {
    return response.status(500).send(err)
  }
})

//if resolved or rejected, mongoose will handle error because it returns a promise

defRouter.get('/new', function(request, response){
  console.log('GET /definitions/new');
  response.render('definitions-form', {});
})

//POST /definitions
defRouter.post('/', function(request, response){
  console.log('POST /definitions');
  response.redirect('/')
})

//export module
module.exports = defRouter;
