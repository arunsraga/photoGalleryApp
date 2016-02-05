'use strict';

var mongoose = require('mongoose');
var Photo;

var photoSchema = new mongoose.Schema({
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  filename: String,
  url: String
});

// class methods



Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
