'use strict';

var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });
require('dotenv').config();
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var each = require('async-each');
var Photo = require('../models/photo');
var s3 = new AWS.S3();


router.post('/:albumId', upload.array('images'), function(req, res){
  var albumId = req.params.albumId;

  each(req.files, function(file, next){
    var filename = file.originalname;
    var ext = filename.match(/\.\w+$/)[0] || '';
    var key = uuid.v1() + ext;

    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
      Body: file.buffer
    };

    s3.putObject(params, function(err, data){
      if (err) return res.status(400).send(err);

      var url = process.env.AWS_URL + "/" + process.env.AWS_BUCKET + "/" + key;
      var photo = new Photo({
        filename: filename,
        url: url,
        albumId: albumId
      });
      photo.save(function(){
        next();
      });
    });

  }, function(err, contents){
    if (err) return res.status(400).send(err);
    res.redirect('/profile/albums/' + req.params.albumId);
  });
});


module.exports = router;
