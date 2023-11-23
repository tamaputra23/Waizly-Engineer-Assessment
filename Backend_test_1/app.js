// Import the Express module
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const {registerasync} = require('./src/register.js')
const {login} = require('./src/login.js')
const {getEmployee} = require('./src/getEmployee.js')
const {updateEmployee} = require('./src/updateEmployee.js')
const {insertEmployee} = require('./src/insertEmployee.js')
const {deleteEmployee} = require('./src/deleteEmployee.js')
const db = require('./src/connection/db')
const morgan = require('morgan');
const logger = require('./logs/logger.js');
const jwt = require('jsonwebtoken');



// Create an Express application
const app = express();
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Register a new user
app.post('/register', async (req, res) => {
    logger.info(`User Register with (username: ${req.body.username}, employee_id: ${req.body.employee_id}`)
  return registerasync(req, res)
});

app.post('/login', async (req, res) => {
    logger.info(`User Login with (username: ${req.body.username}`)
  return login(req, res)
});

app.get('/getemployee', authenticateToken, async (req, res) => {
    logger.info(`get all employee`)
  return getEmployee(req, res)
});

app.put('/updateEmployee/:id', authenticateToken, async (req, res) => {
    logger.info(`update employee data with employee_id: ${req.params.id}, reques update: ${req.body}`)
    return updateEmployee(req, res)
});

app.post('/insertEmployee', authenticateToken, async (req, res) => {
    logger.info(`Insert employee data: ${req.body}`)
    return insertEmployee(req, res)
});

app.delete('/deleteEmployee/:id', authenticateToken, async (req, res) => {
    logger.info(`Delete employee data: ${req.body}`)
    return deleteEmployee(req, res)
});

// Define a route
app.get('/', async(req, res) => {
    const result = await db.query('SELECT $1::text as message', ['Hello, PostgreSQL!']);
    logger.info(`Test Logger`)

    res.send(`PostgreSQL says: ${result.rows[0].message}`);
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    const secretKey = '89b9d7f289f011ee';
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        logger.error('Forbidden: Invalid token')
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }
  
      req.user = user;
      next();
    });
  }
// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// const server = app.listen(3000, () => {
//     const addr = server.address();
//     console.log(`Server listening at http://${addr.address}:${addr.port}`);
//   });