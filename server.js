//___________________
//Dependencies
//___________________
const express = require('express');
const app = express ();
const mongoose = require ('mongoose');
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;



//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));



//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World! , GOOD BYE');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));



