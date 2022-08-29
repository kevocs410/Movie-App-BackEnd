//___________________
//Dependencies
//___________________
const express = require('express');
const app = express ();
const mongoose = require ('mongoose');
const db = mongoose.connection;
require('dotenv').config();
const Shows = require('./models/shows.js');
const cors = require('cors');



app.use(express.json());
app.use(cors());



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

app.post('/shows', (req, res) => {
    Shows.create(req.body, (err, createdShow) =>{
        res.json(createdShow)
    })
} )


app.get('/shows', (req, res) => {
    Shows.find({}, (err, foundShows) => {
        res.json(foundShows);
    })
})

app.delete('/shows/:id', (req,res) => {
    Shows.findByIdAndRemove(req.params.id, (err,deletedShow) => {
        res.json(deletedShow);
    })
})


app.put('/shows/:id', (req,res) => {
Shows.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedShow) =>{
    res.json(updatedShow)
})

})
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));



