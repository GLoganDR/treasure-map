'use strict';

var Mongo = require('mongodb'),
    cp    = require('child_process'),
    _     = require('lodash');

function Treasure(o){
  this.name = o.name;
  this.loc = o.loc;
  this.found = false;
  this.difficulty = o.difficulty;
  this.coordinates = {lat:parseFloat(o.coordinates.lat), lng:parseFloat(o.coordinates.lng)};
  this.photos = [];
  this.hints = o.hints;
  this.url = o.url;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, function(err, obj){
    cb(err, _.create(Treasure.prototype, obj));
  });
};

Treasure.prototype.downloadPhoto = function(url, cb){
  var extensions = url.split('.'),
      extension  = extensions[extensions.length - 1],
      dir = this._id,
      file = this.photos.length + '.' + extension,
      self = this;

  cp.execFile(__dirname + '/../scripts/download.sh', [url, file, dir], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
    var photo = '/img/' + dir + '/' + file;
    self.photos.push(photo);
    Treasure.collection.save(self, cb);
  });
};

module.exports = Treasure;

