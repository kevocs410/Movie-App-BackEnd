const express = require('express');
const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    name: String,
    genre: String,
    image: String,
    created: String,
    lastWatchedEp: String
},
{ timestamps: true }
);

const Shows = mongoose.model('Show', showSchema)

module.exports = Shows;