var request = require('request');


var base_url = "http://localhost:1337/"

describe("App", function() {


  describe("List Fabric Commands", function() {

    it("return status code 500", function(done) {

      request.get(base_url + "commands", function(error, response, body) {
        expect(response.statusCode).toBe(500);
        expect(body).toContain("Couldn't find any fabfiles!");
        done();
      });

    })
  });


});
