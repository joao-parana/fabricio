(function() {

  angular
    .module("ServicesApp")
    .factory("FabricService", FabricService);

  FabricService.$inject = ["$http"];


  function FabricService($http) {

      var service = {
        listCommands : listCommands,
        executeCommand : executeCommand
      };

      function listCommands() {

        var promise = $http.get("/commands");

        return promise;
      }

      function executeCommand(command) {
        var promise = $http.post("/execute", command);

        return promise;
      }

      return service;
  }

})();
