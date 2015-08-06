(function() {

  angular
    .module("FabricioApp")
    .controller("FabricioController", FabricioController);

    FabricioController.$inject = ["FabricService"];


    function FabricioController(FabricService) {

      listCommands();

      var vm = this;

      vm.commands       = undefined;
      vm.executeCommand = executeCommand;

      function executeCommand(command) {
        var promise = FabricService.executeCommand(command);

        console.log(promise);
      }

      function listCommands() {

        var promise = FabricService.listCommands();

        promise.success(function(data, status, headers, config) {
          vm.commands = data;
        }).error(function(data, status, headers, config) {
          console.log("Error executing list commands");
        });

      }

    };

})();
