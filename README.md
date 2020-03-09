# CNA-product
Product-API for the course Cloud Native Apps, Arcada 2020

## What is it?
With this API you are able to create, get, update and delete products

The baseurl is https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev

This API has five endpoints
- Get all products: GET /products
- Get product by id: GET /products/{productId}
- Create a new product: POST/products
- Update a product: PUT /products/{productId}
- Delete a product: DELETE /products/{productId}

Every endpoint that ends with {productId} will show information on a specific product

## Input and output 
To try this API out you can use for example Postman
An API-key is required to be able to make requests

### Get all products
Example: https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev/products

Data output
```bash
{
    "modelNumber": "H10",
    "productPrice": "38,00",
    "productDesc": "A yellow hat",
    "productId": "3672432e-2a46-4800-ac81-111690329a8",
    "productName": "Yellow Hat"
 }
 ```
### Get a product by ID
Example: https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev/products/3672432e-2a46-4800-ac81-111690329a8

Data output
```bash
{
    "modelNumber": "H10",
    "productPrice": "38,00",
    "productDesc": "A yellow hat",
    "productId": "3672432e-2a46-4800-ac81-111690329a8",
    "productName": "Yellow Hat"
}
 ```
### Create a product
Example: https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev/products

The productId is generated automatically when the product has been created

Data input
```bash
{
    "modelNumber": "H10",
    "productPrice": "38,00",
    "productDesc": "A yellow hat",
    "productName": "Yellow Hat"
}
```
Data output
```bash
{
    "modelNumber": "H10",
    "productPrice": "38,00",
    "productDesc": "A yellow hat",
    "productId": "3672432e-2a46-4800-ac81-111690329a8",
    "productName": "Yellow Hat"
 }
 ```
Once a product is successfully created, the application makes a Post API call to the Invetory team, where it creates a new object in their database based on the modelnumber. We used Axios to do the request to a "third party" API

### Delete a product by ID
Example: https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev/products/3672432e-2a46-4800-ac81-111690329a8

### Update a product by id
Example: https://bra2tww5y1.execute-api.eu-west-1.amazonaws.com/dev/products/3672432e-2a46-4800-ac81-111690329a8

Data input
```bash
{
    "modelNumber": "H10",
    "productPrice": "38,00",
    "productDesc": "A green hat",
    "productName": "Green Hat"
}
```
Data output
```bash
{
    "modelNumber": "H10",
    "productPrice": "38,00",
    "productDesc": "A Green hat",
    "productId": "3672432e-2a46-4800-ac81-111690329a8",
    "productName": "Green Hat"
 }
 ```
## Testing
For tests we have used Mocha, Chai and Nock. To install these you run the following line in your terminal
```bash
npm install --save-dev mocha
npm install --save-dev chai
npm install --save-dev nock
```

To run the tests locally just run the following line in your terminal
```bash
npm test
```

## Installation and deployment

### Serverless Framwork
To be able to work with our service, you need to have the Serverless Framework installed on your computer. 

To install Serverless framework run the following line in your terminal:
```bash
npm install -g serverless
```

### AWS credentials
The Serverless framework needs to have access to our AWS. To do that we need a AWS account where we create IAM users and Access keys

We configurated our serverless to be able to use the AWS API-keys & secret by running the following line:
```bash
serverless config credentials --provider aws --key YOUR_IAM_USER_KEY --secret YOUR_IAM_USER_SECRET
```
### Create and deploy the directory
Once we had deployed our directory we created a file called index.js, which contains the code

In the serverless.yml file that we created in the directory, we defined all our functions and configurated the HTTP triggers

To deploy the code and functions to AWS, you need to run this command in your terminal:

```bash
sls deploy
```