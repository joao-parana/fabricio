var request = require('request');
var fs = require('fs');

var base_url = "http://localhost:1337/"
var defaultFabFile = "/tmp/fabfile.py";

describe("App", function() {


  describe("List Fabric Commands", function() {

    beforeEach(function() {

      if (fs.existsSync(defaultFabFile)) {
        fs.unlinkSync(defaultFabFile);
      }
    });

    it("should return status code 500 and error message when fabfile is not found.", function(done) {

      request.get(base_url + "commands", function(error, response, body) {
        expect(response.statusCode).toBe(500);
        expect(body).toContain("Couldn't find any fabfiles!");
        done();
      });

    });

    it("should return status code 200 and command list when there is a fabfile with one command.", function(done) {

      var fabfile = fs.readFileSync("./test/scenarios/fabfile-foo.py");
      fs.writeFileSync(defaultFabFile, fabfile);

      request.get(base_url + "commands", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        expect(body).toBe('["foo"]');
        done();
      });
    });

    it("should return status code 200 and command list when there is a fabfile with two commands.", function(done) {

      var fabfile = fs.readFileSync("./test/scenarios/fabfile-foobar.py");
      fs.writeFileSync(defaultFabFile, fabfile);

      request.get(base_url + "commands", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        expect(body).toBe('["bar","foo"]');
        done();
      });
    });

  });


});
