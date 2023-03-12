'use strict';
const  AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

const scanLegoStore = async () => {
  const scanResults = await dynamo.scan({
    TableName: "LegoStore"
  }).promise();
  return scanResults;
}

const scanLegoStock = async () => {
  const scanResults = await dynamo.scan({
    TableName: "LegoStock"
  }).promise();
  return scanResults;
}

module.exports.putProduct = async (item) => {
    return dynamo.put({
        TableName: "LegoStore",
        Item: item
    }).promise();

}
module.exports.gatherProductList = async (event) => {
  const products = await scanLegoStore();
  const stocks = await scanLegoStock();

  return products.Items.reduce((acc, product) => {
    const productInStock = stocks.Items.find((stock) => stock.product_id === product.id);
    const count = productInStock ? productInStock.count : 0;

    acc.push({
        ...product,
        count
    });
    
    return acc;
  }, [])
}









