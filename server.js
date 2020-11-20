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
 *      Budget:
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *              budget:
 *                  type: integer
 *              personId:
 *                  type: integer
 *      Address:
 *          properties:
 *              id:
 *                  type: integer
 *              street_number:
 *                  type: integer
 *              street_name:
 *                  type: string
 *              suit_type:
 *                  type: string
 *              number_suit:
 *                  type: integer
 *              zip_code:
 *                  type: integer
 *              person_id:
 *                  type: integer
 *      Transaction:
 *          properties:
 *              id:
 *                  type: integer
 *              date:
 *                  type: integer
 *              amount:
 *                  type: integer
 *              recipient:
 *                  type: string
 *              sender:
 *                  type: string
 *              from_id:
 *                  type: integer
 *              to_id:
 *                  type: integer
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
 *                  
 */

 /* budget docs */

 /**
  * @swagger
  * /budget:
  *     get:
  *         tags:
  *             - Budget
  *         description: get all budget info
  *         produces:
  *             - application/json
  *         responses:
  *             200:
  *                 description: array of budget
  *                 schema:
  *                      $ref: '#/definitions/Budget'
  */
 /**
  * @swagger
  * /budget/{id}:
  *     get:
  *         tags:
  *             - Budget
  *         description: get single budget info by id
  *         produces:
  *             - application/json
  *         parameters:
  *             - name: id
  *               description: budget's id
  *               in: path
  *               required: true
  *               type: integer
  *         responses:
  *             200:
  *                 description: single budget
  *                 schema:
  *                     $ref: '#/definitions/Budget'
  */
 /**
  * @swagger
  * /budget:
  *     post:
  *         tags:
  *             - Budget
  *         description: create new budget
  *         produces:
  *             - application/json
  *         parameters:
  *             - name: name
  *               description: budget's name
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Budget'
  *             - name: budget
  *               description: amount of budget
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Budget'
  *             - name: personId
  *               description: person who own this
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Budget'
  *         responses:
  *             201:
  *                 description: created new budget
  */
 /**
  * @swagger
  * /budget/{id}:
  *     put:
  *         tags:
  *             - Budget
  *         description: update budget
  *         produces:
  *             - application/json
  *         parameters:
  *             - name: id
  *               description: id of budget
  *               in: path
  *               required: true
  *               type: integer
  *             - name: name
  *               description: name to update on budget
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Budget'
  *             - name: budget
  *               description: amount of budget to update
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Budget'
  *         responses:
  *             200:
  *                 description: updated the budget
  */
 /**
  * @swagger
  * /budget/{id}:
  *     delete:
  *         tags:
  *             - Budget
  *         description: delete the budget
  *         produces:
  *             - application/json
  *         parameters:
  *             - name: id
  *               description: budget's id
  *               in: path
  *               required: true
  *               type: integer
  *         responses:
  *             204:
  *                 description: deleted the budget
  */
 
/* address docs */

/**
 * @swagger
 * /address:
 *      get:
 *          tags:
 *              - Address
 *          description: get all address record
 *          produces:
 *              - application/json
 *          responses:
 *              200:
 *                  description: array of address
 *                  schema:
 *                      $ref: '#/definitions/Address'
 */
/**
 * @swagger
 * /address/{id}:
 *      get:
 *          tags:
 *              - Address
 *          description: get single address by id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: id of address
 *                in: path
 *                required: true
 *                type: integer
 *          responses:
 *              200:
 *                  description: single address
 *                  schema:
 *                      $ref: '#/definitions/Address'
 */
/**
 * @swagger
 * /address:
 *      post:
 *          tags:
 *              - Address
 *          description: create new address
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: street_number
 *                description: street_number
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: '#/definitions/Address'
 *              - name: street_name
 *                description: street_name
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: '#/definitions/Address'
 *              - name: suit_type
 *                description: suit_type
 *                in: body
 *                required: false
 *                schema:
 *                  $ref: '#/definitions/Address'
 *              - name: number_suit
 *                description: number_suit
 *                in: body
 *                required: false
 *                schema:
 *                  $ref: '#/definitions/Address'
 *              - name: zip_code
 *                description: zip_code
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: '#/definitions/Address'
 *              - name: person_id
 *                description: id of person who own this address
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: '#/definitions/Address'
 *          responses:
 *              201:
 *                  description: created new address
 */
/**
 * @swagger
 * /address/{id}:
 *          put:
 *              tags:
 *                  - Address
 *              description: update address
 *              produces: 
 *                  - application/json
 *              parameters:
 *                  - name: id
 *                    description: id of person's address to update
 *                    in: path
 *                    required: true
 *                    type: integer
 *                  - name: street_number
 *                    description: street_number
 *                    in: body
 *                    required: true
 *                    schema:
 *                      $ref: '#/definitions/Address'
 *                  - name: street_name
 *                    description: street name
 *                    in: body
 *                    required: true
 *                    schema:
 *                      $ref:
 *                          '#/definitions/Address'
 *                  - name: suit_type
 *                    description: type of suit
 *                    in: body
 *                    required: false
 *                    schema:
 *                      $ref:
 *                          '#/definitions/Address'
 *                  - name: number_suit
 *                    description: number of suit
 *                    in: body
 *                    required: false
 *                    schema:
 *                      $ref:
 *                          '#/definitions/Address'
 *                  - name: zip_code
 *                    description: zip_code
 *                    in: body
 *                    required: true
 *                    schema:
 *                      $ref:
 *                          '#/definitions/Address'
 *              responses:
 *                  200:
 *                      description: updated address
 */
/**
 * @swagger
 * /address/{id}:
 *      delete:
 *          tags:
 *              - Address
 *          description: delete the address by address id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: id of address
 *                in: path
 *                required: true
 *                type: integer
 *          responses:
 *              204:
 *                  description: deleted address
 */

 /* transaction docs */

 /**
  * @swagger
  * /transaction:
  *     get:
  *         tags:
  *             - Transaction
  *         description: get all transaction
  *         produces:
  *             - application/json
  *         responses:
  *             200:
  *                 description: array of transaction
  *                 schema:
  *                     $ref: '#/definitions/Transaction'
  */
 /**
  * @swagger
  * /transaction/{id}:
  *     get:
  *         tags:
  *             - Transaction
  *         description: get single transaction
  *         produces:
  *             - application/json
  *         parameters:
  *             - name: id
  *               description: id of transaction
  *               in: path
  *               required: true
  *               type: integer
  *         responses:
  *             200:
  *                 description: single transaction
  *                 schema:
  *                     $ref: '#/definitions/Transaction'
  */
 /**
  * @swagger
  * /transaction/{from_id}/to/{to_id}:
  *     post:
  *         tags:
  *             - Transaction
  *         description: create new transaction
  *         produces:
  *             - application/json
  *         parameters:
  *             - name: date
  *               description: date
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Transaction'
  *             - name: amount
  *               description: amount
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Transaction'
  *             - name: recipient
  *               description: recipient
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Transaction'
  *             - name: sender
  *               description: sender
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Transaction'
  *             - name: from_id
  *               description: id from
  *               in: path
  *               required: true
  *               type: integer
  *             - name: to_id
  *               description: id to
  *               in: path
  *               required: true
  *               type: integer
  *         responses:
  *             201:
  *                 description: created new transaction
  *               
  */
 /**
  * @swagger
  * /transaction/{id}:
  *     put:
  *         tags:
  *             - Transaction
  *         description: update route
  *         produces:
  *             - application/json
  *         parameters:
  *             - name: date
  *               description: date
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Transaction'
  *             - name: amount
  *               description: amount
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Transaction'
  *             - name: recipient
  *               description: recipient
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Transaction'
  *             - name: sender
  *               description: sender
  *               in: body
  *               required: true
  *               schema:
  *                 $ref: '#/definitions/Transaction'
  *         responses:
  *             200:
  *                 description: updated new transaction
  *               
  */
 /**
  * @swagger
  * /transaction/{id}:
  *     delete:
  *         tags:
  *             - Transaction
  *         description: delete transaction
  *         produces:
  *             - application/json
  *         parameters:
  *             - name: id
  *               description: id of transaction
  *               in: path
  *               required: true
  *               type: integer
  *         responses:
  *             204:
  *                 description: deleted transaction
  */