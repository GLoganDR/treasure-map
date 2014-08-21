'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    treasures      = require('../controllers/treasures'),
    home           = require('../controllers/home');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/contact', home.contact);
  app.get('/faq', home.faq);

  app.get('/treasures/new', treasures.init);
  app.post('/treasures/new', treasures.create);
  app.get('/treasures', treasures.index);
  app.get('/treasures/:id', treasures.show);
  app.post('/treasures/:id', treasures.toggleFound);
 

  console.log('Express: Routes Loaded');
};

