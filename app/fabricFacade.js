var spawnSync = require("child_process").spawnSync;
var FabricError = require('./model/FabricError');


module.exports = (function () {

  var fabModule = {
      listCommands : listCommands
  };


  function listCommands(fabfile) {

    if (fabfile) {
      var fabfileParam = ["-f", fabfile];
    }

    var command = spawnSync("fab", ["--shortlist"].concat(fabfileParam));

    if(command.status !== 0) {
      throw new FabricError(command.stderr.toString());
    }

    return command.stdout.toString().slice(0, -1).split('\n');
  }


  return fabModule;

})();
