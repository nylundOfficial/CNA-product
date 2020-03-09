const chai = require('chai');
const expect = require('chai').expect;
const nock = require('nock');
const chaihttp = require('chai-http');
const response = require('./response');
chai.use(chaihttp);
//const handler = require('../index');
chai.should();

const baseurl = 'https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev';

//GET
describe('GET products test', () => {

  it('Get all products', () => {
    nock(baseurl)
      .get('/products')
      .reply(200, response.productsArray);

    chai.request(baseurl)
    .get('/products')
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length.above(1)
      });
  });
  it('should return statuscode 200', ()=>{
    nock(baseurl)
      .get('/products')
      .reply();

    chai.request(baseurl)
    .get('/products')
    .end((err, response) => {
      response.should.have.status(200);
    });
  });


  it('Should use http GET method', ()=>{
    nock(baseurl)
    .get('/products/')
    .reply(200)
    chai.request(baseurl)
    .get('/products/')
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res);
        expect(res.request.method).to.eql('get')
      });
  });

});
 //GET BY ID
describe('GET product test', () => {

  it('Get product by id', () => {
    const id = '4d71bd14-cb7e-4b24-a858-8513b043e3fd';
    nock(baseurl)
      .get('/products/' + id)
      .reply(200, response.productObject);

    chai.request(baseurl)
    .get('/products/' + id)
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.keys('productId', 'modelNumber', 'productName', 'productDesc', 'productPrice')
        expect(res.body.productId).to.be.a('string')
        expect(res.body.modelNumber).to.be.a('string')
        expect(res.body.productDesc).to.be.a('string')
        expect(res.body.productPrice).to.be.a('string')
        expect(res.body.productName).to.be.a('string')
      });
  });
  
  it('Trying to retrieve non-existing productId', () => {
    nock(baseurl)
      .get('/products/invalid_path')
      .reply(404, {"error": "Product not found"});

    chai.request(baseurl)
    .get('/products/invalid_path')
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.body).to.be.an('object')
        expect(res.body.error).to.be.a('string')
      });
  });
  it('Should return statuscode 200', (done)=>{
    const id = '4d71bd14-cb7e-4b24-a858-8513b043e3fd';
    nock(baseurl)
      .get('/products' + id)
      .reply();

    chai.request(baseurl)
    .get('/products' + id)
    .end((err, response) => {
      response.should.have.status(200);
    done();
    });
  });
 
  
  it('Should use http GET method', ()=>{
    const id = '4d71bd14-cb7e-4b24-a858-8513b043e3fd'
    nock(baseurl)
    .get('/products/' + id)
    //.intercept('/products/' + id, 'GET')
    .reply(200)
    chai.request(baseurl)
    .get('/products/' + id)
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res);
        expect(res.request.method).to.eql('get')
      });
  });
});

//POST
describe('POST product test', () => {
  
  it('Create a new product', () => {
    const product = {
      "modelNumber": "H7",
      "productName": "Cool Hat",
      "productDesc": "A cool hat",
      "productPrice": "37,00"
    }
    nock(baseurl)
      .post('/products')
      .reply(201, response.productObject);

    chai.request(baseurl)
    .post('/products')
    .send(product)
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.keys('productId', 'modelNumber', 'productName', 'productDesc', 'productPrice')
        expect(res.body.productId).to.be.a('string')
        expect(res.body.modelNumber).to.be.a('string')
        expect(res.body.productDesc).to.be.a('string')
        expect(res.body.productPrice).to.be.a('string')
        expect(res.body.productName).to.be.a('string')
      });
  });
  const dummyProduct = {
    "modelNumber": 1,
    "productName": "Cool Hat",
    "productDesc": "A cool hat",
    "productPrice": "37,00"
  }
  it('Unable to create new product', () => {
    nock(baseurl)
      .post('/products')
      .reply(400, response.postErrors);

    chai.request(baseurl)
    .post('/products')
    .send(dummyProduct)
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body.modelNumber.error);
        expect(res.status).to.eql(400)
        expect(res.body.modelNumber.error).to.be.a('string')
      });
  });
  it('Should use http POST method', ()=>{
    nock(baseurl)
    .post('/products')
    .reply();

    chai.request(baseurl)
    .post('/products')
    .send(dummyProduct)
    .end(function(err, res) {
        expect(res.request.method).to.eql('post')
      });
  });
  it('Should return statuscode 201 with succesful POST request', (done)=>{
    nock(baseurl)
      .post('/products')
      .reply(201);

    chai.request(baseurl)
    .post('/products')
    .send(dummyProduct)
    .end((err, response) => {
      response.should.have.status(201);
      done();
    });
  });


});

// PUT
describe('PUT product test', () => {
  const product = {
    "modelNumber": "H8"
  }
  const productID = '4d71bd14-cb7e-4b24-a858-8513b043e3fd';
  it('Update an existing product', () => {
    nock(baseurl)
      .put('/products/' + productID)
      .reply(200, {"Message": "Product updated successfully"});

    chai.request(baseurl)
    .put('/products/' + productID)
    .send(product)
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.keys('Message')
        expect(res.body.Message).to.be.a('string')
      });
  });
  
  it('Trying to update a non-existing product', () => {
    const product = {
      "modelNumber": "H8"
    }
    nock(baseurl)
      .put('/products/invalid_path')
      .reply(400, {"error": "Could not update product"});

    chai.request(baseurl)
    .put('/products/invalid_path')
    .send(product)
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res);
        expect(res.status).to.eql(400)
        expect(res.body.error).to.be.a('string')
      });
  });
  it('Should use http PUT method', ()=>{
    nock(baseurl)
      .put('/products/' + productID)
      .reply()

    chai.request(baseurl)
    .put('/products/' + productID)
    .send(product)
    .end(function(err, res) {
        expect(res.request.method).to.eql('put')
      });
  });
  it('Should return statuscode 201 with succesful PUT request', (done)=>{
    nock(baseurl)
      .put('/products')
      .reply(201);

    chai.request(baseurl)
    .put('/products')
    .send(product)
    .end((err, response) => {
      response.should.have.status(201);
      done();
    });
  }); 
});

//DELETE
describe('DELETE product test', () => {
  const productID = '4d71bd14-cb7e-4b24-a858-8513b043e3fd';
  it('Delete an existing product', () => {
    nock(baseurl)
      .delete('/products/' + productID)
      .reply(204, {});

    chai.request(baseurl)
    .delete('/products/' + productID)
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.body).to.be.an('object')
        expect(res.body).empty
      });
  });
  it('Should return statuscode 200 with succesful DELETE request', (done)=>{
    nock(baseurl)
      .delete('/products' + productID)
      .reply();

    chai.request(baseurl)
      .delete('/products' + productID)
      .end(function(err, response){
      expect(response.status).to.eql(200)
      done();
    });
  }); 
  
  it('Trying to delete a non-existing productId', () => {
    nock(baseurl)
      .delete('/products/invalid_path')
      .reply(500, {"error": "Could not delete product"});

    chai.request(baseurl)
    .delete('/products/invalid_path')
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.status).to.eql(500)
        expect(res.body.error).to.be.a('string')
      });
  }); 
  it('Should use http DELETE method', ()=>{
    nock(baseurl)
      .delete('/products/' + productID)
      .reply()

    chai.request(baseurl)
    .delete('/products/' + productID)
    .end(function(err, res) {
        expect(res.request.method).to.eql('delete')
      });
  });
});