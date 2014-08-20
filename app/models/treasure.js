'use strict';

function Treasure(){
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.create = function(cb){
  var t = new Treasure(o);
  Treasure.collection.save(t, cb);
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

