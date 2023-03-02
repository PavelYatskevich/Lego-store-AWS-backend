'use strict';

const products = [
  {
    title: 'A-Frame Cabin',
    id: 1,
    price: 117,
    imageUrl: ""
  },
  {
    title: 'Lego London Bus',
    id: 2,
    price: 10,
    imageUrl: ""
  },
  {
    title: 'Iconic Chess Set',
    id: 3,
    price: 65,
    imageUrl: ""
  },
  {
    title: 'Birthday set',
    id: 4,
    price: 13,
    imageUrl: ""
  },
  {
    title: 'Chinese New Year Pandas',
    id: 5,
    price: 399.99,
    imageUrl: ""
  },
  {
    title: 'Lion Knights Castle',
    id: 6,
    price: 629.99,
    imageUrl: ""
  },
  {
    title: 'Eiffel tower',
    id: 7,
    price: 229.99,
    imageUrl: ""
  },
]
module.exports.getProductsList = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      products,
      null,
      2
    ),
  };


};

module.exports.getProductsById = async (event) => {
  console.log('event', event)
  const {productId} = event.pathParameters;
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      productId ? products.filter((product) => product.id === parseInt(productId))[0] : "Product not found",
      null,
      2
    ),
  };


};

