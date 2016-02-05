'use strict';

var mongoose = require('mongoose');
var Album;

var albumSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {type: String, default: Date.now().toString()}
});

// class methods




Album = mongoose.model('Album', albumSchema);

module.exports = Album;
