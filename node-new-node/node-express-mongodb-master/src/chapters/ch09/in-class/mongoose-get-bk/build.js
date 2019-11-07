const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
<<<<<<< HEAD:src/app/build.js
const bcrypt = require('bcrypt');

const definitions = require('./fixtures/definitions');
const users = require('./fixtures/users');
=======
const definitions = require('./fixtures/definitions');
>>>>>>> eecd30d2cc90441cc962204db4cda4f10bfccf26:src/chapters/ch09/in-class/mongoose-get/build.js

const uri = process.env.DB_CONNECTION;
MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
   if(err) {
      console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   // perform actions on the collection object

   const db = client.db("glossary");

   const defCol = db.collection('definitions');

   defCol.drop();
   console.log('');
   defCol.insertMany(definitions, function(err, cursor) {
    if (err) {
      console.log('There was a problem');
    }
    console.log(cursor.insertedCount);
  });

  const userCol = db.collection('users');

  userCol.drop();
  // const hashedUsers = users.map(function(user){
  //   user.password = bcrypt.hashSync(user.password, 10);
  //   return user;
  // });

  userCol.insertMany(users, function(err, cursor) {
   if (err) {
     console.log('There was a problem');
   }
   console.log(cursor.insertedCount);
 });

  client.close();
});