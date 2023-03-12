'use strict';
const {putProduct} = require('./queries')


module.exports.createProduct = async (item) => {

    if(!item) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: "Some error appear",
        }
    }
    await putProduct(item);
 
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
            item,
            null,
            2
        ),
    };

};

