var fabricFacade = require('../../app/fabricFacade');

describe("FabricFacade", function() {

  describe("listCommands", function() {

      it("should return ['foo']", function() {

        var commandList = fabricFacade.listCommands("test/unit/fabfile-foo.py");

        expect(commandList.length).toEqual(1);
        expect(commandList[0]).toEqual("foo");
      });

      it("should return ['bar', 'foo']", function() {

        var commandList = fabricFacade.listCommands("test/unit/fabfile-foobar.py");

        expect(commandList.length).toEqual(2);
        expect(commandList[0]).toEqual("bar");
        expect(commandList[1]).toEqual("foo");

      });

      it("should throw exception when file not found", function() {

        var command = function() {
          fabricFacade.listCommands("a/b/aspdlsapdlwpk");
        };

        expect(command).toThrow();

      });
  });

  it("should check that fabricFacade is not undefined", function() {
    expect(fabricFacade).not.toBe(undefined);
  });

});
