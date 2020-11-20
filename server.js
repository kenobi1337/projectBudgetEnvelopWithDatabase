const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(helmet());
app.use(compression())

const people_router = require('./people_back_end/people_route');
app.use('/people', people_router);

const budget_router = require('./budget_back_end/budget_route');
app.use('/budget', budget_router);

const address_router = require('./address_back_end/address_route');
app.use('/address', address_router);

const transaction_router = require('./transaction_back_end/transaction_route');
app.use('/transaction', transaction_router);


app.get('/', (req, res) => {
    res.send('server is working');
})


app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});
module.exports = app;


/* swagger documentation section */


const swaggerDocs = require('./docs');
const swaggerUI = require('swagger-ui-express');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/* schema */

/**
 * @swagger
 * definitions:
 *      People:
 *          properties:
 *              id: 
 *                  type: integer
 *              name: 
 *                  type: string
 *              email:
 *                  type: string
 *      
 */

/* book router document */

/**
 * @swagger
 * /people:
 *     get:
 *      tags:
 *          - People
 *      description: Return all people info
 *      produces:
 *        - application/json
 *      responses:
 *          200:
 *              description: An array of people
 *              schema:
 *                  $ref: '#/definitions/People'
 * 
 */
/**
 * @swagger
 * /people/{id}:
 *      get:
 *          tags:
 *              - People
 *          description: Get a single array of people info with ID
 *          produces: 
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: People's ID
 *                in: path
 *                required: true
 *                type: integer
 *          responses:
 *              200:
 *                  description: A single people info
 *                  schema:
 *                      $ref: '#/definitions/People' 
 */
/**
 * @swagger
 * /people:
 *      post:
 *          tags:
 *              - People
 *          description: create the new record of person
 *          produces: 
 *              - application/json
 *          parameters:
 *              - name: name
 *                description: name of person
 *                in: body
 *                required: true
 *                schema: 
 *                  $ref: '#/definitions/People'
 *              - name: email
 *                description: email of person
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: '#definitions/People'
 *          responses:
 *              201:
 *                  description: created the person record
 */
/**
 * @swagger
 * /people/{id}:
 *      put:
 *          tags:
 *              - People
 *          description: update person record's info with ID
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: id of person
 *                in: path
 *                required: true
 *                type: integer
 *              - name: name
 *                description: name to update
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: '#/definitions/People'
 *              - name: email
 *                description: email to update
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: '#/definitions/People'
 *          responses:
 *              200:
 *                  description: updated that person's record
 */
/**
 * @swagger
 * /people/{id}:
 *      delete:
 *          tags:
 *              - People
 *          description: delete the person's record by ID
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: person's id 
 *                in: path
 *                required: true
 *                type: integer
 *          responses:
 *              204:
 *                  description: deleted that person's record  
 */