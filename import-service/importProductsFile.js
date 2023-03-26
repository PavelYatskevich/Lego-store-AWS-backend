'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: 'eu-west-1'})

module.exports.importProductsFile = async (event) => {
    const params  = {
        Bucket: process.env.BUCKET_NAME,
        Key: `uploaded/${event.queryStringParameters.name}`,
        Expires: 60,
        ContentType: 'text/csv'
    }
    
    try{ 
        const response = await s3.getSignedUrl('putObject', params, { expiresIn: 3600 }  )
        console.log(response);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify(response),
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err.message),
        }
    }
    


};

