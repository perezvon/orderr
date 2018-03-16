//server.js
'use strict'
require('dotenv').config()
//first we import our dependencies...
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./router')
//and create our instances
const app = express();

//set our port to either a predetermined port number if you have set it up, or 3001
const port = process.env.PORT || 3001;

const uristring =
    process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/invmgr';
//db config
mongoose.connect(uristring, {useMongoClient: true}, (err, res) => {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
  });

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.REACT_APP_ENV !=='localhost') {
  const path = require('path');
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
}
//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent products
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
