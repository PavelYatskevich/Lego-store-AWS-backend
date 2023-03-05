'use strict';
const {gatherProductList} = require('./queries')


module.exports.getProductsById = async (event) => {
  const {productId} = event.pathParameters;

  const productList = await gatherProductList()
 
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      productId ? productList.filter((product) => product.id === parseInt(productId))[0] : "Product not found",
      null,
      2
    ),
  };


};

