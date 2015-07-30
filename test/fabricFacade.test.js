var fabricFacade = require('../app/fabricFacade');
var assert = require('assert');

describe("FabricFacade", function() {

  it("should check that fabricFacade is not undefined", function() {
    assert.notEqual(fabricFacade, undefined);
  });

});
