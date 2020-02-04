const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const uuidv4 = require('uuid/v4');
const app = express();
const AWS = require('aws-sdk');

const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;


if (IS_OFFLINE === 'true') {
    dynamoDb = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
    console.log(dynamoDb);
  } else {
    dynamoDb = new AWS.DynamoDB.DocumentClient();
};
  
app.use(bodyParser.json({ strict: false }));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// GET PRODUCT
app.get('/products/:productId', function (req, res) {
    const params = {
        TableName: PRODUCTS_TABLE,
        Key: {
            productId: req.params.productId,
        },
    }

    dynamoDb.get(params, (error, result) => {
        if(error.statusCode == 500) {
            console.log(error);
            res.status(500).json({ error: 'Could not get product' });
        } else if (result.Item) {
            const { productId, modelNumber, productName, productDesc, productPrice} = result.Item;
            res.status(200).json({ productId, modelNumber, productName, productDesc, productPrice });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    });
})

// GET ALL PRODUCTS
app.get('/products', function (req, res) {
    const params = {
        TableName: PRODUCTS_TABLE,
        Limit: 100,
    };

    dynamoDb.scan(params, (error, result) => {
        if(error.statusCode == 500) {
            console.log(error);
            res.status(500).json({ error: 'Could not get products' });
        } else if (result.Items) {
            console.log(result.Items);
            res.status(200).json( result.Items);
        } else {
            res.status(404).json({ error: 'Products not found' });
        }
    });
})

// CREATE A PRODUCT
app.post('/products', function (req, res) {
    const productId = uuidv4();
    const {modelNumber, productName, productDesc, productPrice} = req.body;
    if (typeof modelNumber !== 'string') {
        res.status(400).json({ error: '"modelNumber" must be a string' });
    } else if (typeof productName !== 'string') {
        res.status(400).json({ error: '"productName" must be a string' });
    } else if (typeof productDesc !== 'string') {
        res.status(400).json({ error: '"productDesc" must be a string' });
    } else if (typeof productPrice !== 'string') {
        res.status(400).json({ error: '"productPrice" must be a string' });
    }

    const params = {
        TableName: PRODUCTS_TABLE,
        Item: {
            productId: productId,
            modelNumber: modelNumber,
            productName: productName,
            productDesc: productDesc,
            productPrice: productPrice,
        },
    };

    dynamoDb.put(params, (error) => {
        if (error.statusCode == 400) {
            console.log(error);
            res.status(400).json({ error: 'Could not create product' });
        } else if (error.statusCode == 500) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(201).json({ productId, modelNumber, productName, productDesc, productPrice});
        }
    });
})

// DELETE A PRODUCT
app.delete('/products/:productId', function (req, res) {

    console.log("QUERY" + req.query.force_failure);

    if (req.query.force_failure == 1) {
        console.log(error);
        res.status(500).json({ error: "force_failure" });
    } else if (error.statusCode == 500) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
    const params = {
        TableName: PRODUCTS_TABLE,
        Key: {
            productId: req.params.productId,
        },
        // not sure if this is necessary, responses should perhaps be adjusted instead.
        ConditionExpression: "attribute_exists(productId)",
    }

    dynamoDb.delete(params, (error, result) => {
        if(error.statusCode == 400) {
            console.log(error);
            res.status(500).json({ error: 'Could not delete product' });
        } else {
            res.status(204).json({ message: 'Item successfully deleted' });
        }
    });
})


// UPDATE A PRODUCT
app.put('/products/:productId', function (req, res) {
    const data = req.body;

    const generateUpdateQuery = (fields) => {
        let exp = {
            ExpressionAttributeValues: {},
            UpdateExpression: 'set'
        }
        Object.entries(fields).forEach(([key, item]) => {
            exp.ExpressionAttributeValues[`:${key}`] = item;
            exp.UpdateExpression += ` ${key}=:${key},`;
        })
        exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
        return exp
    }

    let expression = generateUpdateQuery(data)

    const params = {
        TableName: PRODUCTS_TABLE,
        Key:{
            productId: req.params.productId
        },
        ConditionExpression: "attribute_exists(productId)",
        UpdateExpression: expression.UpdateExpression,
        ExpressionAttributeValues: expression.ExpressionAttributeValues,
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Updating the item...");
    dynamoDb.update(params, (error, result) => {
        if(error.statusCode == 500) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        } else if (error.statusCode == 400) { 
            console.log(error);
            res.status(400).json({ error: 'Could not update product' });
        } else {
            res.status(200).json({ Message: "Product updated successfully"});
        }
    });
})

module.exports.handler = serverless(app);