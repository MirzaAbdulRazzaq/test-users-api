const express = require('express');
const bodyParser = require('body-parser');
const swagger_doc = require('swagger-jsdoc');
const swagger_ui = require('swagger-ui-express');
var cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;
const usersRoutes = require('./src/routes/users.routes');

app.use(cors())
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Test API',
        version: '1.0.0',
        description: 'A sample TEST API',
    },
    host: 'localhost:3000',
    basePath: '/',
};

const options = {
    swaggerDefinition,
    apis: ['./index.js'],
};

const swagger = swagger_doc(options);
app.use('/api-document', swagger_ui.serve, swagger_ui.setup(swagger));

app.get('/', (req, res) => {
    res.json({ message: 'app working' });
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a specific user by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing item
 *     description: Updates an existing item
 *     requestBody:
 *       description: Update an existent user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get users
 *     description: Retrieves a Users
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new User
 *     description: Creates a new User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful response
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete A User
 *     description: Delete User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */

app.use('/api/users', usersRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ 'message': err.message });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`app running at http://localhost:${port}`)
});