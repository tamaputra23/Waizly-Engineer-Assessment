const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('./connection/db')
const logger = require('../logs/logger.js');
const jwt = require('jsonwebtoken');

const getEmployee = async (req, res) => {
    try {
        const employee = await db.query(`SELECT * from employees where isActive = 1`);
        res.status(201).json({ data: employee.rows });
        return res
    } catch (error) {
        logger.error(`Error when get all employee: ${error}`)
        return res.status(500).json({ message: 'Internal Server Error'});
    }
    
}   
module.exports = {getEmployee}
