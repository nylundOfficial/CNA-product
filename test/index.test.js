const chai = require('chai');
const expect = require('chai').expect;
const nock = require('nock');
chai.use(require('chai-http'));
//const handler = require('../index');
const response = require('./response');

// https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev/products

describe('GET products test', () => {

  it('Get all products', () => {
    nock('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
      .get('/products')
      .reply(200, response.productsArray);

    chai.request('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
    .get('/products')
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length.above(1)
      });
  });

});

describe('GET product test', () => {

  it('Get product by id', () => {
    nock('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
      .get('/products/4d71bd14-cb7e-4b24-a858-8513b043e3fd')
      .reply(200, response.productObject);

    chai.request('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
    .get('/products/4d71bd14-cb7e-4b24-a858-8513b043e3fd')
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
    nock('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
      .get('/products/invalid_path')
      .reply(404, {"error": "Product not found"});

    chai.request('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
    .get('/products/invalid_path')
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.body).to.be.an('object')
        expect(res.body.error).to.be.a('string')
      });
  }); 
});

describe('POST product test', () => {
  
  it('Create a new product', () => {
    const product = {
      "modelNumber": "H7",
      "productName": "Cool Hat",
      "productDesc": "A cool hat",
      "productPrice": "37,00"
    }
    nock('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
      .post('/products')
      .reply(201, response.productObject);

    chai.request('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
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
  
  it('Unable to create new product', () => {
    const product = {
      "modelNumber": 1,
      "productName": "Cool Hat",
      "productDesc": "A cool hat",
      "productPrice": "37,00"
    }
    nock('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
      .post('/products')
      .reply(400, response.postErrors);

    chai.request('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
    .post('/products')
    .send(product)
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body.modelNumber.error);
        expect(res.status).to.eql(400)
        expect(res.body.modelNumber.error).to.be.a('string')
      });
  });

});

describe('PUT product test', () => {
  
  it('Update an existing product', () => {
    const product = {
      "modelNumber": "H8"
    }
    nock('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
      .put('/products/4d71bd14-cb7e-4b24-a858-8513b043e3fd')
      .reply(200, {"Message": "Product updated successfully"});

    chai.request('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
    .put('/products/4d71bd14-cb7e-4b24-a858-8513b043e3fd')
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
    nock('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
      .put('/products/invalid_path')
      .reply(400, {"error": "Could not update product"});

    chai.request('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
    .put('/products/invalid_path')
    .send(product)
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res);
        expect(res.status).to.eql(400)
        expect(res.body.error).to.be.a('string')
      });
  }); 
});

describe('DELETE product test', () => {
  
  it('Delete an existing product', () => {
    nock('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
      .delete('/products/4d71bd14-cb7e-4b24-a858-8513b043e3fd')
      .reply(204, {});

    chai.request('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
    .delete('/products/4d71bd14-cb7e-4b24-a858-8513b043e3fd')
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.body).to.be.an('object')
        expect(res.body).empty
      });
  });
  
  it('Trying to delete a non-existing productId', () => {
    nock('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
      .delete('/products/invalid_path')
      .reply(500, {"error": "Could not delete product"});

    chai.request('https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev')
    .delete('/products/invalid_path')
    .end(function(err, res) {
        //console.log('RESPONSE:');
        //console.log(res.body);
        expect(res.status).to.eql(500)
        expect(res.body.error).to.be.a('string')
      });
  }); 
});