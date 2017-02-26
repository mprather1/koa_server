var chai = require("chai")
var chaiHttp = require("chai-http")
var server = 'http://shintech.ninja:8000/api/v1'
var expect = chai.expect

chai.use(chaiHttp);

describe('API', function(){
  
  it('should get home at /api/v1/home', function(done){
    chai.request(server)
    .get('/home')
    .end(function(err, res){
      expect(res).to.have.status(200)
      expect(res.body.payload).to.equal('hello')
      done()
    })
  })
  
})