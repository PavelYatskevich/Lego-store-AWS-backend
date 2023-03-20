'use strict';
 const {gatherProductList} = require('./queries')

module.exports.getProductsList = async (event) => {
  const productList = await gatherProductList()

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      productList,
      null,
      2
    ),
  };


};

