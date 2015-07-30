var express = require('express');
var fabricFacade = require('./fabricFacade');
var app = express();

app.get('/', function(req, res) {
  res.send(fabricFacade.listCommands());
});

var server = app.listen(1337, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server started at http://%s:%s', host, port);
});
