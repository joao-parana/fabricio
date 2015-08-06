var express = require('express');
var fabricFacade = require('./fabricFacade');


var app = express();

var defaultFabFile = "/tmp/fabfile.py";

app.use(express.static(__dirname + '/public'));


app.get('/commands', function(req, res) {

  try {
    var response = fabricFacade.listCommands(defaultFabFile);

    res.send(response);

  } catch(err) {
    res.status(500).send(err);
  }

});

var server = app.listen(1337, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server started at http://%s:%s', host, port);
});
