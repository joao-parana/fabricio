var fabricFacade = require('../app/fabricFacade');
var assert = require('assert');

describe("FabricFacade", function() {

  describe("listCommands", function() {

      it("should return ['foo']", function() {

        var commandList = fabricFacade.listCommands("test/fabfile-foo.py");

        assert.equal(commandList.length, 1);
        assert.equal(commandList[0], "foo");
      });

      it("should return ['bar', 'foo']", function() {

        var commandList = fabricFacade.listCommands("test/fabfile-foobar.py");

        assert.equal(commandList.length, 2);
        assert.equal(commandList[0], "bar");
        assert.equal(commandList[1], "foo");
      });
  });

  it("should check that fabricFacade is not undefined", function() {
    assert.notEqual(fabricFacade, undefined);
  });

});
