/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure    = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'treasure-map';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var t = new Treasure({name: 'Gold', loc:'Reykjavíc, Iceland', url: 'o.jpg', difficulty:'Hard', coordinates:{lat:'64.133333', lng:'-21.933333'}, hints:'Go to this city and dig around the cemetery'});
      expect(t).to.be.instanceof(Treasure);
      expect(t.name).to.equal('Gold');
      expect(t.difficulty).to.equal('Hard');
      expect(t.loc).to.equal('Reykjavíc, Iceland');
      expect(t.coordinates.lat).to.be.closeTo(64.133333, 0.01);
      expect(t.coordinates.lng).to.be.closeTo(-21.933333, 0.01);
    });
  });

  describe('#save', function(){
    it('should create treasure', function(done){
      var t = new Treasure({name: 'Gold', loc:'Reykjavíc, Iceland', url: 'o.jpg', difficulty:'Hard', coordinates:{lat:'64.133333', lng:'-21.933333'}, hints:'Go to this city and dig around the cemetery'});
      t.save(function(){
        expect(t._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all treasure', function(done){
      Treasure.all(function(err, treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a treasure by its id', function(done){
      Treasure.findById(Mongo.ObjectID('100000000000000000000003'), function(err, treasure){
        expect(treasure.loc).to.equal('Amsterdam, Netherlands');
        expect(treasure).to.be.instanceof(Treasure);
        expect(treasure.name).to.equal('Porsche');
        done();
      });
    });
  });

  describe('#downloadPhoto', function(){
    it('should download/add a photo', function(done){
      var t = new Treasure({name: 'Gold', loc: 'Reykjavíc, Iceland', coordinates:{lat:'64.133333', lng:'-21.933333'}});
      t.downloadPhoto('tuna5jpg.jpg', function(){
        expect(t.photos).to.have.length(1);
        done();
      });
    });
  });
//Last Braces//
});

