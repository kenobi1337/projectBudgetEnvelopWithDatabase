const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const docsRouter = require('express').Router();

const swaggerOption = {
    swaggerDefinition: {
        info: {
            title: 'Budget Envelope',
            version: '1.0.0',
            description: 'this is the project for practice'
        },
        host: 'https://budget-envelop-by-chanathip.herokuapp.com',
        basePath: '/'
    },
    apis: ['./server.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOption);



module.exports = swaggerDocs;