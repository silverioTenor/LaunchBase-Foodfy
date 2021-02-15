const express = require('express');
const { urlencoded, static } = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

const routes = require('./routes');

const server = express();

server.use(urlencoded({ extended: true }));
server.use(static('public'));
server.use(methodOverride('_method'));
server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('src/app/pages', {
  express: server,
  autoescape: false,
  noCache: true
});

server.listen(5000, () => console.log('Server is running...'));