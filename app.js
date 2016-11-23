var cfenv = require('cfenv');
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);

app.use('/addon', express.static(__dirname + '/addon'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/mode', express.static(__dirname + '/mode'));
app.use('/theme', express.static(__dirname + '/theme'));

app.all('/*', function (req, res) {
  'use strict';

  res.sendFile(path.join(__dirname, 'index.html'));
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
server.listen(appEnv.port, function() {
  console.log("server starting on " + appEnv.url);
});
