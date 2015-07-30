var spawnSync = require("child_process").spawnSync;



module.exports = (function () {

  var fabModule = {
      listCommands : listCommands
  };


  function listCommands(fabfile) {

    if (fabfile) {
      var fabfileParam = ["-f", fabfile];
    }

    var command = spawnSync("fab", ["--shortlist"].concat(fabfileParam));
    return command.stdout.toString().slice(0, -1).split('\n');
  }


  return fabModule;

})();
