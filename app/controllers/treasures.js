// Step 1. Make a new Treasure Object
// Step 2: Call the Save prototype function of that object
// Step 3. Call downloadPhoto(req.body.url, cb)

'use strict';

var Treasure = require('../models/treasure');

exports.init = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    res.render('treasures/init', {treasure:treasure});
  });
};

exports.create = function(req, res){
  var t = new Treasure(req.body);
  t.save(function(){
    res.redirect('/treasures');
  });
};

exports.index = function(req, res){
  Treasure.all(function(err, treasures){
    res.render('treasures/index', {treasures:treasures});
  });
};

exports.show = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    res.render('treasures/show', {treasure:treasure});
  });
};

exports.downloadPhoto = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    treasure.downloadPhoto(req.body.url, function(){
      res.redirect('/treasures/' + req.params.id);
    });
  });
};
