'use strict';
const csv = require('csv-parser');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: 'eu-west-1'})



module.exports.importFileParser = async (event) => {

    try {
        for (const record of event.Records) {

        const objectName = record.s3.object.key;
        const command = {
            Bucket: process.env.BUCKET_NAME,
            Key: objectName,
        };
        const copyCommand = {
            Bucket: process.env.BUCKET_NAME,
            CopySource: process.env.BUCKET_NAME + '/' + objectName,
            Key: record.s3.object.key.replace('uploaded', 'parsed'),
        };
        const deleteCommand = {
            Bucket: process.env.BUCKET_NAME,
            Key: objectName,
        };



        const getObjectResult = await send(new s3.GetObjectCommand(command))
        
        let results = [];

        await asStream(getObjectResult).pipe(csv({}))
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results);
            });
        await client.send(new s3.CopyObjectCommand(copyCommand));
        await client.send(new s3.DeleteObjectCommand(deleteCommand));
        }
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'successfully data parsed and moved to parsed folder'}),
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err.message),
        }
    }
    


};

