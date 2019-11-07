const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const definitions = require('./fixtures/definitions');
const users = require('./fixtures/users');

const uri = process.env.DB_CONNECTION;
MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
   if(err) {
      console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   // perform actions on the collection object

   const db = client.db("glossary");

   // Add definitions
   const defCol = db.collection('definitions');

   defCol.drop();

   defCol.insertMany(definitions, function(err, cursor) {
    if (err) {
      console.log('There was a problem');
    }
    console.log(cursor.insertedCount);

    // Add users
    const userCol = db.collection('users');

    // userCol.drop();
    console.log(users);
    userCol.insertMany(users, function(err, cursor) {
     if (err) {
       console.log('There was a problem');
     }
     console.log(cursor.insertedCount);
    });

  });
  client.close();
});