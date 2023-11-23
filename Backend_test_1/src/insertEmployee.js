const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('./connection/db')
const logger = require('../logs/logger.js');
const jwt = require('jsonwebtoken');

const insertEmployee = async (req, res) => {
    const errors = validationResult(req);
    const {name, job_title, salary, department, joined_date} = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        // Insert the data in the database
        const result = await db.query('INSERT INTO employees (name, job_title, salary, department, joined_date) VALUES ($1, $2, $3, $4, $5)',
          [name, job_title, salary, department, joined_date]);
        if (result.rowCount === 1) {
          return res.status(200).json({ message: 'Employee Inserted successfully' });
        } else {
            return res.status(404).json({ message: 'Employee not found' });
        }
      } catch (error) {
        logger.error(`Error on Insert employee: ${error}`)
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
}   
module.exports = {insertEmployee}
