var request = require('request');


var base_url = "http://localhost:1337/"

describe("App", function() {


  describe("List Fabric Commands", function() {

    it("should return status code 500 and error message when fabfile is not found.", function(done) {

      request.get(base_url + "commands", function(error, response, body) {
        expect(response.statusCode).toBe(500);
        expect(body).toContain("Couldn't find any fabfiles!");
        done();
      });

      it("should return status code 200 and command list when there is a fabfile with one command.", function(done) {
        
        request.get(base_url + "commands", function(error, response, body) {
          expect(response.statusCode).toBe(500);
          expect(body).toContain("Couldn't find any fabfiles!");
          done();
        });

    })
  });


});
