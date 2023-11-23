const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('./connection/db')
const logger = require('../logs/logger.js');
const jwt = require('jsonwebtoken');


const registerasync = async (req, res) => {
    try {
        const errors = validationResult(req);
        const secretKey = '89b9d7f289f011ee';

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password, employee_id } = req.body;

        // Validate and sanitize the username
        body(username).trim().isLength({ min: 1 }).escape()
        // Validate and sanitize the password
        body(password).isLength({ min: 8 }).escape()

        // Trim whitespace from username and password
        const trimmedUsername = username?.trim();
        const trimmedPassword = password?.trim();

        // Hash the password with bcrypt and a unique salt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(trimmedPassword, saltRounds);
        // Store the user in the database
        const register = await db.query('INSERT INTO users (username, password, employee_id) VALUES ($1, $2, $3)', [trimmedUsername, hashedPassword, employee_id]);
        const token = jwt.sign({ username: username, employee_id: employee_id }, secretKey, { expiresIn: '1h' });

        return res.status(201).json({ message: 'User registered successfully', 'token': token });
    } 
    catch (error) {
        logger.error(`Error when register: ${error}`)
        return res.status(500).json({ message: 'User registration error', 'error': error });
    }
    
}

module.exports = {registerasync}
