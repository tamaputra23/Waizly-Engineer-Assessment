const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('./connection/db')
const logger = require('../logs/logger.js');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const errors = validationResult(req);
    const secretKey = '89b9d7f289f011ee';
    const { username, password } = req.body;
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
         // Validate and sanitize the username
         body(username).trim().isLength({ min: 1 }).escape()
         // Validate and sanitize the password
         body(password).isLength({ min: 8 }).escape()
    
         // Trim whitespace from username and password
        const trimmedUsername = username?.trim();
        const trimmedPassword = password?.trim();
        const login = await db.query('SELECT username, password, employee_id from users where username =$1 and isactive = 1', [trimmedUsername]);
        if (!login.rows) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, login.rows[0].password);
    
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        // Generate a JWT token
        const token = jwt.sign({ username: trimmedUsername, employee_id: login.rows[0].employee_id }, secretKey, { expiresIn: '1h' });
        res.status(201).json({ token });
        return res
    } catch (error) {
        logger.error(`Error when login: ${error}`)
        return res.status(500).json({ message: 'Internal Server Error'});
    }
    
}   
module.exports = {login}
